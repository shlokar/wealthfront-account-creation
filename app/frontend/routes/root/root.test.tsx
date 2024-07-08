import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Root } from './root';

jest.mock('../../reusable-components/card/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('../../reusable-components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={onClick}>{children}</button>
}));

describe('Root Component', () => {
  const originalLocation = window.location;
  let mockLocation: Location;

  beforeAll(() => {
    mockLocation = { ...window.location, href: '', assign: jest.fn() } as Location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: mockLocation,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  test('renders the FlowLayout component', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  test('renders the card content correctly', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.getByText(/Create your account to access all the features:/i)).toBeInTheDocument();
    expect(screen.getByText(/Track your expenses and income/i)).toBeInTheDocument();
    expect(screen.getByText(/Create and manage budgets/i)).toBeInTheDocument();
    expect(screen.getByText(/Get personalized financial insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Access your account from any device/i)).toBeInTheDocument();
    expect(screen.getByText(/Join us today and take the first step towards managing your finances efficiently!/i)).toBeInTheDocument();
  });

  test('renders the Sign Up button', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('redirects to create account page on button click', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    expect(mockLocation.href).toBe('/create-account');
  });
});
