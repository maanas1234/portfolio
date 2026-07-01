import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/publications", label: "Publications" },
  { to: "/experience", label: "Experience" },
  { to: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-mono-tag text-sm text-[var(--text)]">
          maanas<span className="text-[var(--accent)]">.</span>
        </NavLink>
        <ul className="flex gap-5 font-mono-tag text-[13px]">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
