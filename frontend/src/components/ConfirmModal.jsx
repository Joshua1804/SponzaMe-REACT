import { useEffect, useRef } from "react";
import { AlertTriangle, Zap, HelpCircle } from "lucide-react";

/**
 * Reusable confirmation modal.
 *
 * Props:
 *  open        – boolean, controls visibility
 *  title       – string
 *  message     – string (body text)
 *  confirmText – string, default "Confirm"
 *  cancelText  – string, default "Cancel"
 *  variant     – "danger" | "warning" | "default"
 *  loading     – boolean, shows spinner on confirm button
 *  onConfirm   – () => void
 *  onCancel    – () => void
 */
export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}) {
  const overlayRef = useRef(null);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape" && !loading) onCancel?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, loading, onCancel]);

  if (!open) return null;

  const btnColor =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
      : variant === "warning"
      ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-300"
      : "bg-[#5157a1] hover:bg-[#393873] focus:ring-[#5157a1]/30";

  const iconBg =
    variant === "danger"
      ? "bg-red-100 text-red-600"
      : variant === "warning"
      ? "bg-amber-100 text-amber-600"
      : "bg-[#5157a1]/10 text-[#5157a1]";

  const icon =
    variant === "danger" ? <AlertTriangle size={24} /> : variant === "warning" ? <Zap size={24} /> : <HelpCircle size={24} />;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current && !loading) onCancel?.();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md mx-4 p-6 animate-[slideUp_0.2s_ease]">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center text-xl mx-auto mb-4`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#393873] text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        {message && (
          <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-all focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${btnColor}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Wait…
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
