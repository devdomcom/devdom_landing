import React from 'react';
import NavItem from './NavItem';

interface NavItemData {
  href?: string;
  label: string;
  submenu?: NavItemData[];
  complexContent?: React.ReactNode | (() => React.ReactNode) | string | React.ComponentType;
}

interface NavProps {
  items: NavItemData[];
}

const Nav: React.FC<NavProps> = ({ items }) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-brand-01 overflow-visible">
      <ul className="flex items-center px-4 sm:px-6 py-3 list-none overflow-x-auto">
        {items.map((item, index) => (
          <NavItem key={index} href={item.href} label={item.label} submenu={item.submenu} complexContent={item.complexContent} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;