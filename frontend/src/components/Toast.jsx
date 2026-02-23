import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

/* ── Toast container + hook ── */

const ICONS = {
  success: <CheckCircle size={20} />,
  error: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

const COLORS = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  error: "bg-red-50 border-red-200 text-red-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

function ToastItem({ toast, onDismiss }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300
        ${COLORS[toast.type] || COLORS.info}
        ${exiting ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"}
      `}
    >
      <span className="text-lg flex-shrink-0">
        {ICONS[toast.type] || ICONS.info}
      </span>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="text-current opacity-40 hover:opacity-70 transition-opacity flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Toast container – rendered as a portal.
 * Use the `useToast` hook to add toasts.
 *
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast("Profile saved!", "success");
 *   <ToastContainer toasts={toasts} removeToast={removeToast} />
 */
export function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 w-full max-w-sm pointer-events-auto">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={removeToast} />
      ))}
    </div>,
    document.body
  );
}

let _toastId = 0;

/**
 * Hook to manage toasts.
 * Returns { toasts, addToast, removeToast }
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
