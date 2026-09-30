import { Link, NavLink } from "react-router-dom";
import { navLinkBase, primaryNavItems } from "./navConfig.js";

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
      {primaryNavItems.map((item) =>
        item.exact ? (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-indigo-100 text-indigo-800" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ) : item.to.includes("#") ? (
          <Link key={item.to} to={item.to} className={navLinkBase}>
            {item.label}
          </Link>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-indigo-100 text-indigo-800" : ""}`
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}

export default DesktopNav;
