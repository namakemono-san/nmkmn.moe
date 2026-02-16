import { NavLink } from "react-router";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "Tools", to: "/tools" },
];

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto max-w-xl px-4 pt-4">
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
    </header>
  );
}

export default Header;
