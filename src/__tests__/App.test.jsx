import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component UAT', () => {
  test('renders debug element', () => {
    render(<App />);
    expect(screen.getByText(/Debug: Hello World!/i)).toBeInTheDocument();
  });

  test('renders with correct theme wrapper', () => {
    render(<App />);
    expect(document.querySelector('.bg-gray-100')).toBeInTheDocument();
  });

  test('renders ProfileCard component', () => {
    render(<App />);
    // Assuming ProfileCard is rendered, check for its container
    expect(document.querySelector('.max-w-7xl')).toBeInTheDocument();
  });

  test('counter button works', () => {
    render(<App />);
    const button = screen.getByText(/Clicked 0 times/i);
    fireEvent.click(button);
    expect(screen.getByText(/Clicked 1 times/i)).toBeInTheDocument();
  });

  test('interactive elements are functional', async () => {
    render(<App />);
    const button = screen.getByText(/Clicked/i);
    expect(button).toBeEnabled();
  });
});
