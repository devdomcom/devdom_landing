import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import NavSubmenu from './NavSubmenu.tsx';

test('renders standard submenu', () => {
  render(
    <NavSubmenu mode="standard">
      <li>Item 1</li>
      <li>Item 2</li>
    </NavSubmenu>
  );

  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});

test('renders complex submenu', () => {
  render(
    <NavSubmenu mode="complex">
      <div>Complex content</div>
    </NavSubmenu>
  );

  expect(screen.getByText('Complex content')).toBeInTheDocument();
});