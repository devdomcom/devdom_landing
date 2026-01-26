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
            className="block px-4 py-2 text-text hover:bg-gray-100 w-full text-left transition-colors duration-200 rounded-md whitespace-nowrap cursor-pointer"
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
      <a href={href} className="block px-4 py-2 text-text hover:bg-gray-100 transition-colors duration-200 rounded-md whitespace-nowrap">{label}</a>
    </li>
  );
};

export default NavSubitem;