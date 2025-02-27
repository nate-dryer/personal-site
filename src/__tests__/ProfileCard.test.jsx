import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ProfileCard from '../components/ProfileCard';  // Fixed import path

describe('ProfileCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    render(
      <ThemeProvider>
        <ProfileCard />
      </ThemeProvider>
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows loading spinner initially', () => {
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays content after loading', async () => {
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(screen.getByText('Nate Dryer')).toBeInTheDocument();
      expect(screen.getByText('Product Manager | AI & ML Innovator')).toBeInTheDocument();
    });
  });

  it('has accessible buttons with proper labels', async () => {
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Get in Touch' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Download Resume' })).toBeInTheDocument();
    });
  });

  it('has accessible social links', async () => {
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument();
    });
  });

  it('applies mount animation class when loaded', async () => {
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      const card = screen.getByRole('heading', { name: 'Nate Dryer' }).closest('div');
      expect(card).toHaveClass('opacity-100');
      expect(card).not.toHaveClass('opacity-0');
    });
  });

  it('renders profile image with proper alt text', async () => {
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      const image = screen.getByAltText('Profile');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/profile.png');
    });
  });
});