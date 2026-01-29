import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ThemeToggle from './ThemeToggle.tsx';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

test('renders theme toggle button', () => {
  render(<ThemeToggle />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/switch to dark mode/i);
});

test('toggles theme on click', () => {
  render(<ThemeToggle />);

  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toHaveTextContent(/switch to light mode/i);
});