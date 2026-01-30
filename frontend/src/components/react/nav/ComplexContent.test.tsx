import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ComplexContent from './ComplexContent.tsx';

test('renders complex content with title', () => {
  render(<ComplexContent />);

  expect(screen.getByText('Complex Popover')).toBeInTheDocument();
  expect(screen.getByText('This is a fully customizable popover with various elements, ideal for mega menus or detailed sub-navigation.')).toBeInTheDocument();
});

test('renders services and resources sections', () => {
  render(<ComplexContent />);

  expect(screen.getByText('Services')).toBeInTheDocument();
  expect(screen.getByText('Resources')).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(6); // 3 services + 3 resources
});

test('renders action buttons', () => {
  render(<ComplexContent />);

  const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
  const getStartedButton = screen.getByRole('button', { name: /get started/i });
  expect(learnMoreButton).toBeInTheDocument();
  expect(getStartedButton).toBeInTheDocument();
});