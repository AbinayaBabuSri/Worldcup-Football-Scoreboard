import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
  test('renders the App component', () => {
    render(<App />);
    expect(screen.getByText('Football World Cup Scoreboard')).toBeInTheDocument();
  });
});