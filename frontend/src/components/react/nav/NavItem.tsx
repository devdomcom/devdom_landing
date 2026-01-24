import React, { useState } from 'react';
import NavSubmenu from './NavSubmenu';
import NavSubitem from './NavSubitem';
import ComplexContent from './ComplexContent';

interface NavItemProps {
  href?: string;
  label: string;
  submenu?: NavItemProps[];
  complexContent?: React.ReactNode | (() => React.ReactNode) | string | React.ComponentType;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, submenu, complexContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  if (submenu || complexContent) {
    return (
      <li className="relative">
        <div onMouseLeave={handleMouseLeave}>
          <button
            onMouseEnter={handleMouseEnter}
            className="block px-4 py-2 hover:bg-gray-100"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {label}
          </button>
          {isOpen && (
            complexContent ? (
              <NavSubmenu mode="complex">
                {complexContent === 'complex' ? (
                  <ComplexContent />
                ) : typeof complexContent === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: complexContent }} />
                ) : typeof complexContent === 'function' ? (
                  React.createElement(complexContent as React.ComponentType)
                ) : (
                  complexContent
                )}
              </NavSubmenu>
            ) : (
              <NavSubmenu mode="standard">
                {submenu!.map((sub, idx) => (
                  <NavSubitem key={idx} href={sub.href || '#'} label={sub.label} submenu={sub.submenu} />
                ))}
              </NavSubmenu>
            )
          )}
        </div>
      </li>
    );
  }

  return (
    <li>
      <a href={href} className="block px-4 py-2 hover:bg-gray-100">{label}</a>
    </li>
  );
};

export default NavItem;