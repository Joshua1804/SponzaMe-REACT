import { useState, useRef, useEffect } from "react";
import api from "../api";
import "./Chatbot.css";

const WELCOME_MSG = {
  role: "bot",
  text: "Hey there! 👋 I'm **Pozo**, your SponzaMe assistant. Ask me anything about navigating the platform, creating campaigns, finding sponsors, or managing your tokens!",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const handleToggle = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 250);
    } else {
      setOpen(true);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Build history for context (skip welcome message)
    const history = messages
      .filter((m) => m !== WELCOME_MSG)
      .map((m) => ({ role: m.role === "bot" ? "model" : "user", text: m.text }));

    try {
      const res = await api.post("/chat", { message: text, history });
      const reply = res.data.reply || "Sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        "Oops! Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-ish bold rendering
  const renderText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className={`chatbot-window ${closing ? "closing" : ""}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">🤖</div>
            <div className="chatbot-header-info">
              <h3>Pozo</h3>
              <p>SponzaMe AI Assistant</p>
            </div>
            <button className="chatbot-close" onClick={handleToggle} aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {renderText(msg.text)}
              </div>
            ))}
            {loading && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Pozo anything..."
              disabled={loading}
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className={`chatbot-fab ${open ? "open" : ""}`}
        onClick={handleToggle}
        aria-label="Open chat"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
