import { Link } from "react-router-dom";
import { ArrowIcon } from "./icons.jsx";

function DesktopAuthActions({ user, loggingOut, onLogout }) {
  if (!user) {
    return (
      <>
        <Link
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:brightness-95"
          to="/login"
        >
          Log in
        </Link>
        <Link
          className="flex items-center gap-1.5 rounded-xl border border-transparent bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:brightness-110"
          to="/signup"
        >
          Sign up
          <ArrowIcon />
        </Link>
      </>
    );
  }

  return (
    <>
      <span className="text-sm text-slate-500">Hi, {user.username}</span>
      <button
        type="button"
        disabled={loggingOut}
        className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onLogout}
      >
        {loggingOut ? "Logging out..." : "Log out"}
      </button>
    </>
  );
}

function MobileAuthActions({ user, loggingOut, onLogout, onClose }) {
  if (!user) {
    return (
      <>
        <Link
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
          to="/login"
          onClick={onClose}
        >
          Log in
        </Link>
        <Link
          className="flex items-center justify-center gap-1.5 rounded-xl border border-transparent bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white"
          to="/signup"
          onClick={onClose}
        >
          Sign up
          <ArrowIcon />
        </Link>
      </>
    );
  }

  return (
    <button
      type="button"
      disabled={loggingOut}
      className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      onClick={onLogout}
    >
      {loggingOut ? "Logging out..." : "Log out"}
    </button>
  );
}

export { DesktopAuthActions, MobileAuthActions };
