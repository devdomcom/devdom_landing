import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import NavItem from './NavItem.tsx';

test('renders nav item with link', () => {
  render(<NavItem href="/home" label="Home" />);

  const link = screen.getByRole('menuitem', { name: /home/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/home');
});

test('renders nav item with button when submenu exists', () => {
  render(<NavItem label="Services" submenu={[{ href: '/web', label: 'Web Design' }]} />);

  const button = screen.getByRole('menuitem', { name: /services/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-haspopup', 'true');
});
