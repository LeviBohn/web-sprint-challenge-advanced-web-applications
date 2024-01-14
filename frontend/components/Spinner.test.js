// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

test('sanity', () => {
  expect(true).toBe(true)
})

test('renders spinner when spinnerOn is true', () => {
  const { getByTestId } = render(<Spinner on={true} />);
  const spinnerElement = getByTestId('spinner');
  expect(spinnerElement).toBeInTheDocument();
});

test('does not render spinner when spinnerOn is false', () => {
  const { queryByTestId } = render(<Spinner on={false} />);
  const spinnerElement = queryByTestId('spinner');
  expect(spinnerElement).not.toBeInTheDocument();
});