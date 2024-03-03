import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, isRottenUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                user && (rest.path !== '/movies' || isRottenUser()) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
