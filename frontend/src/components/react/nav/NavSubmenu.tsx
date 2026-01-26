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
      <div ref={ref as React.Ref<HTMLDivElement>} className="bg-white shadow-brand-02 p-4 border border-gray-200 rounded-md w-max" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
    );
  }
  if (mode === 'nested') {
    return (
      <ul ref={ref as React.Ref<HTMLUListElement>} className="absolute top-0 left-full bg-white shadow-brand-02 border border-gray-200 rounded-md w-max" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </ul>
    );
  }
  // standard
  return (
    <ul ref={ref as React.Ref<HTMLUListElement>} className="bg-white shadow-brand-02 border border-gray-200 rounded-md w-max" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </ul>
  );
});

NavSubmenu.displayName = 'NavSubmenu';

export default NavSubmenu;