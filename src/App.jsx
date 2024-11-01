import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import PortalLayout from './components/PortalLayout';
import MainContent from './components/MainContent'
import { AuthProvider, useAuth } from './contexts/AuthContext';


function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <PortalLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<MainContent />} />

                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}