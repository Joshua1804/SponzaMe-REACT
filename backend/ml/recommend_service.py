"""
SponzaMe — Creator Recommendation Microservice
Scores creators against a campaign and returns the top 3 matches.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import re

app = Flask(__name__)
CORS(app)

# ── Weights ──────────────────────────────────────────────────────────
W_NICHE     = 0.40
W_PLATFORMS = 0.25
W_LOCATION  = 0.20
W_FOLLOWERS = 0.15

TOP_N = 3


# ── Helpers ──────────────────────────────────────────────────────────

def _parse_followers(raw) -> int:
    """Convert follower strings like '10K', '1.5M', or plain numbers to int."""
    if raw is None:
        return 0
    s = str(raw).strip().upper().replace(",", "")
    m = re.match(r'^([\d.]+)\s*([KMB]?)$', s)
    if not m:
        try:
            return int(float(s))
        except ValueError:
            return 0
    num = float(m.group(1))
    suffix = m.group(2)
    multiplier = {'K': 1_000, 'M': 1_000_000, 'B': 1_000_000_000}.get(suffix, 1)
    return int(num * multiplier)


def _platform_set(raw) -> set:
    """Normalise a comma-separated platform string into a lowercase set."""
    if not raw:
        return set()
    return {p.strip().lower() for p in str(raw).split(",") if p.strip()}


def _jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 0.0
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def _location_score(campaign_loc: str, creator_loc: str) -> float:
    """Case-insensitive location comparison with partial matching."""
    if not campaign_loc or not creator_loc:
        return 0.0
    cl = campaign_loc.strip().lower()
    cr = creator_loc.strip().lower()
    if cl == cr:
        return 1.0
    # partial: one contains the other (e.g. "Mumbai" in "Mumbai, India")
    if cl in cr or cr in cl:
        return 0.7
    return 0.0


# ── Scoring ──────────────────────────────────────────────────────────

def score_creators(campaign: dict, creators: list) -> list:
    """Score each creator against the campaign and return sorted results."""

    campaign_niche = (campaign.get("niche") or "").strip().lower()
    campaign_platforms = _platform_set(campaign.get("platforms"))
    campaign_location = campaign.get("location") or ""

    # Collect follower counts for min-max normalisation
    follower_counts = [_parse_followers(c.get("followers")) for c in creators]
    max_f = max(follower_counts) if follower_counts else 1
    min_f = min(follower_counts) if follower_counts else 0
    range_f = max_f - min_f if max_f != min_f else 1

    results = []

    for idx, creator in enumerate(creators):
        reasons = []

        # 1) Niche match
        creator_niche = (creator.get("niche") or "").strip().lower()
        if campaign_niche and creator_niche:
            niche_score = 1.0 if creator_niche == campaign_niche else 0.0
        else:
            niche_score = 0.0

        if niche_score == 1.0:
            reasons.append(f"Niche match: {creator.get('niche')}")
        elif campaign_niche:
            reasons.append(f"Niche mismatch (campaign: {campaign.get('niche')}, creator: {creator.get('niche') or 'N/A'})")

        # 2) Platform overlap
        creator_platforms = _platform_set(creator.get("platforms"))
        platform_score = _jaccard(campaign_platforms, creator_platforms)

        if platform_score == 1.0:
            reasons.append("All target platforms covered")
        elif platform_score > 0:
            overlap = campaign_platforms & creator_platforms
            reasons.append(f"Platforms overlap: {', '.join(sorted(overlap))}")
        elif campaign_platforms:
            reasons.append("No platform overlap")

        # 3) Location
        loc_score = _location_score(campaign_location, creator.get("location") or "")

        if loc_score >= 1.0:
            reasons.append(f"Location match: {creator.get('location')}")
        elif loc_score > 0:
            reasons.append(f"Partial location match: {creator.get('location')}")
        elif campaign_location:
            reasons.append(f"Different location: {creator.get('location') or 'N/A'}")

        # 4) Followers (normalised)
        f_count = follower_counts[idx]
        follower_score = (f_count - min_f) / range_f

        if f_count >= 100_000:
            reasons.append(f"High reach: {f_count:,} followers")
        elif f_count >= 10_000:
            reasons.append(f"Good reach: {f_count:,} followers")
        else:
            reasons.append(f"Growing audience: {f_count:,} followers")

        # Composite
        total = (
            W_NICHE     * niche_score
            + W_PLATFORMS * platform_score
            + W_LOCATION  * loc_score
            + W_FOLLOWERS * follower_score
        )
        match_pct = int(round(total * 100))

        results.append({
            "creator_id": creator.get("creator_id"),
            "user_id":    creator.get("user_id"),
            "name":       creator.get("fullname") or creator.get("name") or "Unknown",
            "niche":      creator.get("niche") or "—",
            "location":   creator.get("location") or "—",
            "followers":  creator.get("followers") or "0",
            "platforms":  creator.get("platforms") or "",
            "match_score": match_pct,
            "reasons":    reasons,
        })

    # Sort descending by score
    results.sort(key=lambda r: r["match_score"], reverse=True)
    return results[:TOP_N]


# ── Endpoint ─────────────────────────────────────────────────────────

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid JSON body"}), 400

    campaign = data.get("campaign")
    creators = data.get("creators")

    if not campaign:
        return jsonify({"error": "Missing 'campaign' field"}), 400
    if not creators or not isinstance(creators, list):
        return jsonify({"error": "Missing or empty 'creators' list"}), 400

    recommendations = score_creators(campaign, creators)
    return jsonify({"recommendations": recommendations})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    print("🚀  SponzaMe Recommendation Service running on http://127.0.0.1:5001")
    app.run(host="127.0.0.1", port=5001, debug=True)
