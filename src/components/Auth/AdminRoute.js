import { Navigate, Route, useLocation } from 'react-router-dom';
import MoviesGrid from '../../pages/MoviesGrid';

function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const role = sessionStorage.getItem('role');
  const email = sessionStorage.getItem('email');

  return (
    <Route
      {...rest}
      render={() =>
        email === 'admin@rotten' && role === 'admin' ? (
          children
        ) : (
          <Navigate to="/" state={{ from: location }} replace />
        )
      }
    />
  );
}

<ProtectedRoute path="/dashboard">
  <MoviesGrid />
</ProtectedRoute>