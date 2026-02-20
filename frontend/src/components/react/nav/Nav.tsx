import React, { useState } from 'react';
import NavItem from './NavItem';
import Logo from '../Logo';
import menuIcon from '../../../assets/icons/nav-menu.svg';
import closeIcon from '../../../assets/icons/icon-close-large.svg';

interface NavItemData {
  href?: string;
  label: string;
  submenu?: NavItemData[];
  complexContent?: React.ReactNode | (() => React.ReactNode) | string | React.ComponentType;
}

interface NavProps {
  items: NavItemData[];
  logoHref?: string;
  logoAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const Nav: React.FC<NavProps> = ({
  items,
  logoHref = '/',
  logoAlt = 'Devdom',
  ctaLabel = 'Book a call',
  ctaHref = '#',
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return (
    <nav className="bg-surface-card overflow-visible text-ink-primary" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={logoHref} className="shrink-0" aria-label={logoAlt}>
          <Logo alt={logoAlt} />
        </a>
        <ul className="hidden md:flex flex-1 items-center justify-center gap-6 list-none overflow-x-auto" role="menubar">
          {items.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} submenu={item.submenu} complexContent={item.complexContent} />
          ))}
        </ul>
        <div className="ml-auto hidden md:flex">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center h-12 px-5 py-4 rounded-[12px] border border-[color:var(--button-secondary-border)] bg-[color:var(--button-secondary-bg)] text-[color:var(--button-secondary-text)] font-body text-body-xs hover:bg-[color:var(--button-secondary-bg-hover)] hover:border-[color:var(--button-secondary-border-hover)] hover:text-[color:var(--button-secondary-text-hover)] transition-colors"
            style={{ color: 'var(--button-secondary-text)', transition: 'color 150ms ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--button-secondary-text-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--button-secondary-text)')}
          >
            {ctaLabel}
          </a>
        </div>
        <button
          type="button"
          className="ml-auto md:hidden inline-flex items-center justify-center w-10 h-10 text-[color:var(--nav-toggle-color)]"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          onClick={toggleMobile}
        >
          <span className="sr-only">{isMobileOpen ? 'Close menu' : 'Open menu'}</span>
          <img
            src={isMobileOpen ? closeIcon.src : menuIcon.src}
            alt=""
            aria-hidden="true"
            className="w-9 h-9"
          />
        </button>
      </div>
      {isMobileOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-border-subtle bg-surface-card">
          <ul className="flex flex-col gap-3 px-6 py-4 list-none" role="menubar">
            {items.map((item, index) => (
              <NavItem key={index} href={item.href} label={item.label} submenu={item.submenu} complexContent={item.complexContent} />
            ))}
          </ul>
          <div className="px-6 pb-5">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center h-12 px-5 py-4 rounded-[12px] border border-[color:var(--button-secondary-border)] bg-[color:var(--button-secondary-bg)] text-[color:var(--button-secondary-text)] font-body text-body-xs hover:bg-[color:var(--button-secondary-bg-hover)] hover:border-[color:var(--button-secondary-border-hover)] hover:text-[color:var(--button-secondary-text-hover)] transition-colors w-full"
              style={{ color: 'var(--button-secondary-text)', transition: 'color 150ms ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--button-secondary-text-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--button-secondary-text)')}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
