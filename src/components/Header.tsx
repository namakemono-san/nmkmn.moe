import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Tools", to: "/tools" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Desktop nav */}
      <div className="mx-auto max-w-xl px-4 pt-4 max-md:hidden">
        <nav className="flex items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-2 py-2 shadow-lg backdrop-blur-xl">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-xl px-5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:bg-white/10 hover:text-white/80"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile hamburger */}
      <div className="px-4 pt-3 md:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 shadow-lg backdrop-blur-xl transition-colors hover:bg-white/10"
          aria-label="Menu"
        >
          {open ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <nav className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-xl">
              {navItems.map(({ label, to }) => {
                const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
                return (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/50 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
