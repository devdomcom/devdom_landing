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
    <nav className="bg-white shadow">
      <ul className="flex space-x-4 p-4 list-none">
        {items.map((item, index) => (
          <NavItem key={index} href={item.href} label={item.label} submenu={item.submenu} complexContent={item.complexContent} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;