import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuth} from './features/authSlice';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Locations from './pages/locations/Locations';
import Transportations from './pages/transportations/Transportations';
import RoutesPage from './pages/routes/Routes';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated} = useSelector(selectAuth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

const RoleBasedRedirect: React.FC = () => {
    const {role} = useSelector(selectAuth);

    if (role === 'ROLE_ADMIN') {
        return <Navigate to="/locations" replace/>;
    } else if (role === 'ROLE_AGENCY') {
        return <Navigate to="/routes" replace/>;
    }

    return <Navigate to="/login" replace/>;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<AppLayout/>}>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <RoleBasedRedirect/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/locations"
                        element={
                            <ProtectedRoute>
                                <Locations/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transportations"
                        element={
                            <ProtectedRoute>
                                <Transportations/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/routes"
                        element={
                            <ProtectedRoute>
                                <RoutesPage/>
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App; 