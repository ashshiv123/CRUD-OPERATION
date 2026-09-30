import { useFlash } from "../../context/FlashContext.jsx";

function Flash() {
  const { flash, clearFlash } = useFlash();

  if (!flash) return null;

  const success = flash.type === "success";

  return (
    <div
      className={`mb-4 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-800"
      }`}
      role="status"
      aria-live="polite"
    >
      <span>{flash.message}</span>
      <button
        type="button"
        className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
        onClick={clearFlash}
      >
        Dismiss
      </button>
    </div>
  );
}

export default Flash;
