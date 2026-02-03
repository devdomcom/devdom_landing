import React, { useState, useRef, useLayoutEffect, useEffect, useId } from 'react';
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
  const id = useId();
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

  // Close when focus leaves both button and submenu (portal-aware)
  useEffect(() => {
    if (!isOpen || !isClient) return;
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        submenuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, [isOpen, isClient]);

  const moveHorizontal = (direction: 'next' | 'prev') => {
    const li = buttonRef.current?.closest('li');
    if (!li) return;
    const sibling = direction === 'next' ? li.nextElementSibling : li.previousElementSibling;
    const target = sibling?.querySelector<HTMLElement>('button[role="menuitem"], a[role="menuitem"]');
    target?.focus();
  };

  const focusFirstSubmenuItem = () => {
    requestAnimationFrame(() => {
      const first = submenuRef.current?.querySelector<HTMLElement>('a,button');
      first?.focus();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (submenu || complexContent) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        focusFirstSubmenuItem();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveHorizontal('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveHorizontal('prev');
      }
    } else {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveHorizontal('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveHorizontal('prev');
      }
    }
  };

  const submenuId = submenu || complexContent ? `submenu-${id}` : undefined;

  if (submenu || complexContent) {
    return (
      <li className="relative" role="none">
        <button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          className="block font-body text-body-xs text-ink-secondary hover:text-ink-primary hover:underline transition-colors duration-200 whitespace-nowrap bg-transparent"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={submenuId}
          role="menuitem"
        >
          {label}
        </button>
        {isOpen && isClient && ReactDOM.createPortal(
          complexContent ? (
            <NavSubmenu
              ref={submenuRef}
              mode="complex"
              style={submenuStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              id={submenuId}
            >
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
            <NavSubmenu
              ref={submenuRef}
              mode="standard"
              style={submenuStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              id={submenuId}
            >
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
    <li role="none">
      <a
        href={href}
        className="block font-body text-body-xs text-ink-secondary hover:text-ink-primary hover:underline transition-colors duration-200 whitespace-nowrap bg-transparent"
        role="menuitem"
        onKeyDown={handleKeyDown}
      >
        {label}
      </a>
    </li>
  );
};

export default NavItem;
