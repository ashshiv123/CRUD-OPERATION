import { CloseIcon, HamburgerIcon } from "./icons.jsx";

function MobileMenuButton({ menuOpen, onToggle }) {
  return (
    <button
      type="button"
      className="grid place-items-center rounded-xl border border-indigo-200 bg-indigo-50 p-2 text-indigo-700 md:hidden"
      onClick={onToggle}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
    >
      {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
    </button>
  );
}

export default MobileMenuButton;
