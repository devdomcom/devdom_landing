import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const submenuRef = useRef<HTMLDivElement | HTMLUListElement>(null);
  const [submenuStyle, setSubmenuStyle] = useState<React.CSSProperties>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClient = typeof document !== 'undefined';

  const closeSubmenu = () => setIsOpen(false);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(closeSubmenu, 200);
  };

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current && isClient) {
      const rect = buttonRef.current.getBoundingClientRect();
      let top = rect.bottom;
      let left = rect.left;

      setSubmenuStyle({
        position: 'fixed',
        top,
        left,
        zIndex: 9999,
      });

      // After initial render, measure actual size and adjust
      const adjustPosition = () => {
        if (submenuRef.current) {
          const submenuRect = submenuRef.current.getBoundingClientRect();
          let newTop = top;
          let newLeft = left;

          if (submenuRect.bottom > window.innerHeight) {
            newTop = rect.top - submenuRect.height;
          }
          if (submenuRect.right > window.innerWidth) {
            newLeft = window.innerWidth - submenuRect.width;
          }
          if (newLeft < 0) {
            newLeft = 0;
          }
          if (newTop < 0) {
            newTop = 0;
          }

          setSubmenuStyle({
            position: 'fixed',
            top: newTop,
            left: newLeft,
            zIndex: 9999,
          });
        }
      };

      // Use setTimeout to ensure the element is rendered
      setTimeout(adjustPosition, 0);
    }
  }, [isOpen, isClient]);

  if (submenu || complexContent) {
    return (
      <li className="relative">
        <button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="block px-2 sm:px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card transition-colors duration-200 rounded-md whitespace-nowrap cursor-pointer border border-subtle"
          style={{ background: "var(--surface-muted)", borderColor: "var(--border-subtle)" }}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {label}
        </button>
        {isOpen && isClient && ReactDOM.createPortal(
          complexContent ? (
            <NavSubmenu ref={submenuRef} mode="complex" style={submenuStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
            <NavSubmenu ref={submenuRef} mode="standard" style={submenuStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {submenu!.map((sub, idx) => (
                <NavSubitem key={idx} href={sub.href || '#'} label={sub.label} submenu={sub.submenu} />
              ))}
            </NavSubmenu>
          ),
          document.body
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        className="block px-2 sm:px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card transition-colors duration-200 rounded-md whitespace-nowrap border border-subtle"
        style={{ background: "var(--surface-muted)", borderColor: "var(--border-subtle)" }}
      >
        {label}
      </a>
    </li>
  );
};

export default NavItem;
