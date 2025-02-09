import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuth} from './features/authSlice';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Locations from './pages/locations/Locations';
import Transportations from './pages/transportations/Transportations';
import RoutesPage from './pages/routes/Routes';
import Forbidden from "@/components/Forbidden";

const ProtectedRoute: React.FC<{ children: React.ReactNode, roles: string[] }> = ({children, roles}) => {
    const {isAuthenticated, role} = useSelector(selectAuth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    if(!role || !roles.includes(role)) {
        return <Forbidden/>;
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
                            <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_AGENCY']}>
                                <RoleBasedRedirect/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/locations"
                        element={
                            <ProtectedRoute roles={['ROLE_ADMIN']}>
                                <Locations/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transportations"
                        element={
                            <ProtectedRoute roles={['ROLE_ADMIN']}>
                                <Transportations/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/routes"
                        element={
                            <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_AGENCY']}>
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