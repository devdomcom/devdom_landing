import React, { useEffect, useRef, useState, useId } from 'react';
import NavSubmenu from './NavSubmenu';

interface NavSubitemProps {
  href?: string;
  label: string;
  submenu?: NavSubitemProps[];
}

const NavSubitem: React.FC<NavSubitemProps> = ({ href, label, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nestedRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const moveVertical = (current: HTMLElement, direction: 'next' | 'prev') => {
    const li = current.closest('li');
    const sibling = direction === 'next' ? li?.nextElementSibling : li?.previousElementSibling;
    const target = sibling?.querySelector<HTMLElement>('a[role="menuitem"], button[role="menuitem"]');
    target?.focus();
  };

  const focusFirstChild = () => {
    requestAnimationFrame(() => {
      const first = nestedRef.current?.querySelector<HTMLElement>('a,button');
      first?.focus();
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: FocusEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || nestedRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('focusin', handler);
    return () => document.removeEventListener('focusin', handler);
  }, [isOpen]);

  if (submenu) {
    return (
      <li className="relative" role="none">
        <div onMouseLeave={handleMouseLeave}>
          <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            className="block px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card w-full text-left transition-colors duration-200 rounded-md whitespace-nowrap cursor-pointer border border-border-subtle"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={`submenu-${id}`}
            role="menuitem"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
                focusFirstChild();
              } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
                e.preventDefault();
                setIsOpen(false);
                buttonRef.current?.focus();
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                moveVertical(e.currentTarget, 'prev');
              }
            }}
          >
            {label}
          </button>
          {isOpen && (
            <NavSubmenu mode="nested" ref={nestedRef} id={`submenu-${id}`}>
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
    <li role="none">
      <a
        href={href}
        className="block px-4 py-2 text-ink-secondary bg-surface-muted hover:bg-surface-card transition-colors duration-200 rounded-md whitespace-nowrap border border-border-subtle"
        role="menuitem"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveVertical(e.currentTarget, 'next');
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveVertical(e.currentTarget, 'prev');
          } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
            e.preventDefault();
            (e.currentTarget.closest('button[role=\"menuitem\"]') as HTMLElement | null)?.focus();
          }
        }}
      >
        {label}
      </a>
    </li>
  );
};

export default NavSubitem;
