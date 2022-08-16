import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App with title', () => {
  const { getByText } = render(<App />);

  expect(getByText(/ENV MODE/i)).toBeInTheDocument();
});
