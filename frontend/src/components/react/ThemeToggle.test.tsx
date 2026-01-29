import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('applies system preference when no stored theme', async () => {
    mockMatchMedia(true); // prefers dark
    render(<ThemeToggle />);
    await waitFor(() => expect(document.documentElement.getAttribute('data-theme')).toBe('dark'));
  });

  it('toggles and persists theme', async () => {
    mockMatchMedia(false);
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(button);
    await waitFor(() => expect(document.documentElement.getAttribute('data-theme')).toBe('dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
    fireEvent.click(button);
    await waitFor(() => expect(document.documentElement.getAttribute('data-theme')).toBeNull());
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
