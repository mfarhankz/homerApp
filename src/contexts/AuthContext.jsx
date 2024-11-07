import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = Cookies.get('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, []);

    // Initialize auth state from token
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = Cookies.get('authToken');
                if (token) {
                    const tokenData = JSON.parse(atob(token.split('.')[1]));
                    // Check if token is expired
                    if (Date.now() >= tokenData.exp * 1000) {
                        await logout();
                    } else {
                        // Token is valid, restore user session                      
                        setIsAuthenticated(true);
                        setUser({
                            userName: tokenData.userName,
                            displayName: tokenData.displayName,
                            isActive: tokenData.isActive
                        });

                        // Set up timer for token expiration
                        const timeUntilExpiry = tokenData.exp * 1000 - Date.now();
                        setupExpirationTimer(timeUntilExpiry);
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                await logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const setupExpirationTimer = (timeUntilExpiry) => {
        // Clear any existing timer
        if (window.tokenExpirationTimer) {
            clearTimeout(window.tokenExpirationTimer);
        }
        // Set new timer
        window.tokenExpirationTimer = setTimeout(() => {
            console.log('Token expired, logging out');
            logout();
        }, timeUntilExpiry);
    };

    const login = async (email, password) => {
        const apiEndpoint = import.meta.env.VITE_Homer_API_Base_Url;
        const response = await axios.post(`${apiEndpoint}/Account/signin`, {
            userName: email,
            password: password,
        });

        const { userName, displayName, isActive, status, message, token } = response.data;

        if (status === 0) {
            // Store token in cookie (expires in 1 hour)
            Cookies.set('authToken', token, { expires: 1 / 24 });
            // Set up timer for token expiration
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const timeUntilExpiry = tokenData.exp * 1000 - Date.now();
            setupExpirationTimer(timeUntilExpiry);
            setIsAuthenticated(true);
            setUser({ userName, displayName, isActive });
        } else {
            const error = new Error(message);
            error.status = status;
            throw error;
        }
    };

    const logout = async () => {
        // Clear timer if it exists
        if (window.tokenExpirationTimer) {
            clearTimeout(window.tokenExpirationTimer);
        }

        // Clear auth state
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('authToken');
        // Optional: Call logout endpoint if needed
        try {
            const apiEndpoint = import.meta.env.VITE_Homer_API_Base_Url;
            await axios.post(`${apiEndpoint}/Account/signout`);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Refresh token before it expires
    const refreshToken = async () => {
        try {
            const apiEndpoint = import.meta.env.VITE_Homer_API_Base_Url;
            const response = await axios.post(`${apiEndpoint}/Account/refresh-token`);

            if (response.data.token) {
                Cookies.set('authToken', response.data.token, { expires: 1 / 24 });
                const tokenData = JSON.parse(atob(response.data.token.split('.')[1]));
                setupExpirationTimer(tokenData.exp * 1000 - Date.now());
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            await logout();
        }
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        refreshToken,
        loading
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}