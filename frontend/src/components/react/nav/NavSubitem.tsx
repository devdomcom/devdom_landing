import React, { useState } from 'react';
import NavSubmenu from './NavSubmenu';

interface NavSubitemProps {
  href?: string;
  label: string;
  submenu?: NavSubitemProps[];
}

const NavSubitem: React.FC<NavSubitemProps> = ({ href, label, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  if (submenu) {
    return (
      <li className="relative">
        <div onMouseLeave={handleMouseLeave}>
          <button
            onMouseEnter={handleMouseEnter}
            className="block px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card w-full text-left transition-colors duration-200 rounded-md whitespace-nowrap cursor-pointer border border-subtle"
            style={{ background: "var(--surface-muted)", borderColor: "var(--border-subtle)" }}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {label}
          </button>
          {isOpen && (
            <NavSubmenu mode="nested">
              {submenu.map((sub, idx) => (
                <NavSubitem key={idx} href={sub.href} label={sub.label} submenu={sub.submenu} />
              ))}
            </NavSubmenu>
          )}
        </div>
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        className="block px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card transition-colors duration-200 rounded-md whitespace-nowrap border border-subtle"
        style={{ background: "var(--surface-muted)", borderColor: "var(--border-subtle)" }}
      >
        {label}
      </a>
    </li>
  );
};

export default NavSubitem;
