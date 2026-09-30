import { Link, NavLink } from "react-router-dom";
import { MobileAuthActions } from "./AuthActions.jsx";

function MobileMenu({ menuOpen, user, loggingOut, onClose, onLogout }) {
  if (!menuOpen) return null;

  return (
    <div className="mx-auto mb-3 grid w-[min(1150px,92vw)] gap-2 rounded-2xl border border-indigo-100 bg-white p-3 shadow-sm md:hidden">
      <NavLink
        to="/listings"
        end
        className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700"
        onClick={onClose}
      >
        Home
      </NavLink>
      <Link
        to="/listings#boys"
        className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700"
        onClick={onClose}
      >
        Boys Listings
      </Link>
      <Link
        to="/listings#girls"
        className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700"
        onClick={onClose}
      >
        Girls Listings
      </Link>
      <NavLink
        to="/listings/new"
        className="rounded-xl border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700"
        onClick={onClose}
      >
        Add Listing
      </NavLink>
      <MobileAuthActions
        user={user}
        loggingOut={loggingOut}
        onLogout={onLogout}
        onClose={onClose}
      />
    </div>
  );
}

export default MobileMenu;
