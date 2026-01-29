import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import NavSubitem from './NavSubitem.tsx';

test('renders nav subitem with link', () => {
  render(<NavSubitem href="/web-design" label="Web Design" />);

  const link = screen.getByRole('link', { name: /web design/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/web-design');
});

test('renders nav subitem with button when submenu exists', () => {
  render(<NavSubitem label="SEO" submenu={[{ href: '/on-page', label: 'On-page SEO' }]} />);

  const button = screen.getByRole('button', { name: /seo/i });
  expect(button).toBeInTheDocument();
});