import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Logo from './Logo.tsx';

test('renders logo with correct alt text', () => {
  render(<Logo alt="Devdom Logo" />);

  const logo = screen.getByRole('img', { name: /devdom logo/i });
  expect(logo).toBeInTheDocument();
});

test('renders logo with custom width and height', () => {
  render(<Logo alt="Test Logo" width={300} height={75} />);

  const logo = screen.getByRole('img', { name: /test logo/i });
  expect(logo).toHaveStyle({ width: '300px', height: '75px' });
});

test('uses dark logo when theme is dark', () => {
  document.documentElement.setAttribute('data-theme', 'dark');
  render(<Logo alt="Dark Logo" />);

  const logo = screen.getByRole('img', { name: /dark logo/i });
  expect(logo).toHaveStyle({ backgroundImage: expect.stringContaining('devdom-logo-on-dark-mode') });
});
