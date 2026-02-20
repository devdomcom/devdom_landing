import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    expect(screen.getByRole('menuitem', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /complex/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument();
  });

  it('opens submenu on hover for Services', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('menuitem', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    expect(screen.getByRole('menuitem', { name: /web design/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /seo/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /marketing/i })).toBeInTheDocument();
  });

  it('opens nested submenu on hover for SEO', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('menuitem', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    const seoButton = screen.getByRole('menuitem', { name: /seo/i });
    fireEvent.mouseEnter(seoButton);
    expect(screen.getByRole('menuitem', { name: /on-page seo/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /off-page seo/i })).toBeInTheDocument();
  });

  it('opens complex popover on hover for Complex', () => {
    render(<Nav items={mockItems} />);
    const complexButton = screen.getByRole('menuitem', { name: /complex/i });
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
    const servicesButton = screen.getByRole('menuitem', { name: /services/i });
    fireEvent.mouseEnter(servicesButton);
    expect(screen.getByRole('menuitem', { name: /web design/i })).toBeInTheDocument();
    // Fire mouseLeave on the wrapper div to close
    const wrapperDiv = servicesButton.parentElement;
    fireEvent.mouseLeave(wrapperDiv!);
  });

  it('applies correct styling classes', () => {
    render(<Nav items={mockItems} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-surface-card');
  });

  it('opens submenu with keyboard and focuses first item', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('menuitem', { name: /services/i });
    servicesButton.focus();
    fireEvent.keyDown(servicesButton, { key: 'Enter' });
    const firstItem = screen.getByRole('menuitem', { name: /web design/i });
    return waitFor(() => expect(firstItem).toHaveFocus());
  });

  it('closes submenu with Escape', () => {
    render(<Nav items={mockItems} />);
    const servicesButton = screen.getByRole('menuitem', { name: /services/i });
    fireEvent.keyDown(servicesButton, { key: 'Enter' });
    expect(screen.getByRole('menuitem', { name: /web design/i })).toBeInTheDocument();
    fireEvent.keyDown(servicesButton, { key: 'Escape' });
    expect(screen.queryByRole('menuitem', { name: /web design/i })).not.toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Nav items={mockItems} />);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    expect(document.getElementById('mobile-nav')).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(document.getElementById('mobile-nav')).toBeInTheDocument();
  });
});
