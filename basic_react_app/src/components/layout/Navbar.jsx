import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Brand from "./navbar/Brand.jsx";
import DesktopNav from "./navbar/DesktopNav.jsx";
import { DesktopAuthActions } from "./navbar/AuthActions.jsx";
import MobileMenuButton from "./navbar/MobileMenuButton.jsx";
import MobileMenu from "./navbar/MobileMenu.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    setMenuOpen(false);
    await logout();
    setLoggingOut(false);
    navigate("/listings");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-indigo-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] w-[min(1150px,92vw)] items-center justify-between gap-4">
        <Brand onClick={closeMenu} />
        <DesktopNav />
        <div className="hidden items-center gap-2 md:flex">
          <DesktopAuthActions user={user} loggingOut={loggingOut} onLogout={handleLogout} />
        </div>
        <MobileMenuButton menuOpen={menuOpen} onToggle={() => setMenuOpen((prev) => !prev)} />
      </div>
      <MobileMenu
        menuOpen={menuOpen}
        user={user}
        loggingOut={loggingOut}
        onClose={closeMenu}
        onLogout={handleLogout}
      />
    </header>
  );
}

export default Navbar;
