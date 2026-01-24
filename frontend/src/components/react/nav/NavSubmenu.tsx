import React from 'react';

interface NavSubmenuProps {
  children: React.ReactNode;
  mode?: 'standard' | 'complex';
}

const NavSubmenu: React.FC<NavSubmenuProps> = ({ children, mode = 'standard' }) => {
  if (mode === 'complex') {
    return (
      <div className="absolute bg-white shadow mt-1 z-10 p-4">
        {children}
      </div>
    );
  }
  return (
    <ul className="absolute bg-white shadow mt-1 z-10">
      {children}
    </ul>
  );
};

export default NavSubmenu;