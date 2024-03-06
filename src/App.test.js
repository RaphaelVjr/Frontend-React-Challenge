import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders Login component for default route', () => {
  window.history.pushState({}, '', '/');
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText('Kendo Movies')).toBeInTheDocument();
});

  test('renders SignUp component for /sign route', () => {
    window.history.pushState({}, '', '/sign');
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
