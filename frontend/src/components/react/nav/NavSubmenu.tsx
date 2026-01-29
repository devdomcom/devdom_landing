import React from 'react';

interface NavSubmenuProps {
  children: React.ReactNode;
  mode?: 'standard' | 'complex' | 'nested';
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ref?: React.Ref<HTMLDivElement | HTMLUListElement>;
}

const NavSubmenu = React.forwardRef<HTMLDivElement | HTMLUListElement, NavSubmenuProps>(({ children, mode = 'standard', style, onMouseEnter, onMouseLeave }, ref) => {
  if (mode === 'complex') {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className="bg-surface-raised shadow-brand-03 p-4 border border-border-subtle rounded-md w-max text-ink-primary"
        style={{ ...style, background: "var(--surface-raised)", borderColor: "var(--border-subtle)" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    );
  }
  if (mode === 'nested') {
    return (
      <ul
        ref={ref as React.Ref<HTMLUListElement>}
        className="absolute top-0 left-full bg-surface-raised shadow-brand-03 border border-border-subtle rounded-md w-max text-ink-primary"
        style={{ ...style, background: "var(--surface-raised)", borderColor: "var(--border-subtle)" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </ul>
    );
  }
  // standard
  return (
    <ul
      ref={ref as React.Ref<HTMLUListElement>}
      className="bg-surface-raised shadow-brand-03 border border-border-subtle rounded-md w-max text-ink-primary"
      style={{ ...style, background: "var(--surface-raised)", borderColor: "var(--border-subtle)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </ul>
  );
});

NavSubmenu.displayName = 'NavSubmenu';

export default NavSubmenu;
