import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import PortalLayout from './components/PortalLayout';
import MainContent from './components/MainContent'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import NeighborhoodReportGenerator from './components/NeighborhoodReportGenerator';
import ReportResult from './components/report/ReportResult'


// PublicRoute component
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/signin"
                        element={
                            <PublicRoute>
                                <SignInPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/viewreport/:reportId"
                        element={
                            <PublicRoute>
                                <ReportResult />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <PrivateRoute>
                                <PortalLayout />
                            </PrivateRoute>
                        }>
                        <Route index element={<MainContent />} />
                        <Route path="report/generate/:location" element={<NeighborhoodReportGenerator />} />
                        <Route path="report/:reportId" element={<ReportResult />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}