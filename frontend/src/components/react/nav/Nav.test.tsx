import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from './Nav';
import ComplexContent from './ComplexContent';

const mockItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    submenu: [
      { label: 'Web Design', href: '/services/web-design' },
      {
        label: 'SEO',
        submenu: [
          { label: 'On-page SEO', href: '/services/seo/on-page' },
          { label: 'Off-page SEO', href: '/services/seo/off-page' },
        ],
      },
      { label: 'Marketing', href: '/services/marketing' },
    ],
  },
  {
    label: 'Complex',
    complexContent: 'complex',
  },
  { label: 'Contact', href: '/contact' },
];

describe('Nav', () => {
  it('renders all nav items', () => {
    render(<Nav items={mockItems} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complex/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('opens submenu on hover for Services', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    expect(screen.getByRole('link', { name: /web design/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /seo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /marketing/i })).toBeInTheDocument();
  });

  it('opens nested submenu on hover for SEO', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    const seoButton = screen.getByRole('button', { name: /seo/i });
    fireEvent.mouseEnter(seoButton);
    expect(screen.getByRole('link', { name: /on-page seo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /off-page seo/i })).toBeInTheDocument();
  });

  it('opens complex popover on hover for Complex', () => {
    render(<Nav items={mockItems} />);
    const complexButton = screen.getByRole('button', { name: /complex/i });
    fireEvent.mouseEnter(complexButton);
    expect(complexButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { name: /complex popover/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /complex popover/i })).toBeVisible();
    expect(screen.getByText(/this is a fully customizable popover/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a fully customizable popover/i)).toBeVisible();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeVisible();
  });

  it('closes submenu on mouse leave', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('button', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    expect(screen.getByRole('link', { name: /web design/i })).toBeInTheDocument();
    // Fire mouseLeave on the wrapper div to close
    const wrapperDiv = servicesButton.parentElement;
    fireEvent.mouseLeave(wrapperDiv!);
  });
});