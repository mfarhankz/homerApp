import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '../services/api';
import { saveCityData } from '../hooks/useCityData';
import { savePropertyTypeData } from '../hooks/usePropertyTypesData';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Setup refresh timer
    const setupRefreshTimer = (expiresIn) => {
        if (window.refreshTimer) {
            clearTimeout(window.refreshTimer);
        }

        // Calculate when to refresh (e.g., 5 minutes before expiration)
        const refreshTime = expiresIn - (5 * 60 * 1000); // 5 minutes before expiry

        if (refreshTime > 0) {
            window.refreshTimer = setTimeout(refreshToken, refreshTime);
        }
    };

    // Setup expiration timer
    const setupExpirationTimer = (timeUntilExpiry) => {
        if (window.tokenExpirationTimer) {
            clearTimeout(window.tokenExpirationTimer);
        }
        window.tokenExpirationTimer = setTimeout(() => {
            handleLogout();
        }, timeUntilExpiry);
    };

    // Initialize auth state from token
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = Cookies.get('authToken');
                const profileTokenString = Cookies.get('profileToken');
                let profileToken = {};
                if (profileTokenString != "" && profileTokenString != undefined) {
                    profileToken = JSON.parse(profileTokenString);
                }
                if (token) {
                    const tokenData = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Date.now();
                    const expirationTime = tokenData.exp * 1000;
                    const timeUntilExpiry = expirationTime - currentTime;

                    if (timeUntilExpiry <= 0) {
                        // Token is already expired
                        await handleLogout();
                    } else if (timeUntilExpiry <= 5 * 60 * 1000) {
                        // Less than 5 minutes until expiry, refresh immediately
                        const refreshed = await refreshToken();
                        if (!refreshed) {
                            await handleLogout();
                        }
                    } else {
                        // Token is valid, restore session
                        setIsAuthenticated(true);
                        setUser({
                            userName: tokenData.userName,
                            displayName: tokenData.displayName,
                            isActive: tokenData.isActive,
                            firstName: profileToken?.firstName || 'Unknown',
                            lastName: profileToken?.lastName || 'Unknown',
                            brokerageName: profileToken?.brokerageName || 'Unknown',
                        });

                        // Setup timers
                        //setupRefreshTimer(timeUntilExpiry);
                        //setupExpirationTimer(timeUntilExpiry);
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                await handleLogout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Cleanup timers on unmount
        return () => {
            if (window.refreshTimer) clearTimeout(window.refreshTimer);
            if (window.tokenExpirationTimer) clearTimeout(window.tokenExpirationTimer);
        };
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authAPI.login(email, password);

            if (data.status === 0) {
                // Handle auth token
                Cookies.set('authToken', data.token, { expires: 1 / 24 });
                Cookies.set('profileToken', JSON.stringify(data.profileSettings), { expires: 1 / 24 });
                const tokenData = JSON.parse(atob(data.token.split('.')[1]));
                const timeUntilExpiry = tokenData.exp * 1000 - Date.now();

                setupRefreshTimer(timeUntilExpiry);
                setupExpirationTimer(timeUntilExpiry);

                // Set auth state
                setIsAuthenticated(true);
                setUser({
                    userName: data.userName,
                    displayName: data.displayName,
                    isActive: data.isActive,
                    firstName: data.profileSettings.firstName,
                    lastName: data.profileSettings.lastName,
                    brokerageName: data.profileSettings.brokerageName,
                });

                // Save city data if it comes with the response
                if (data.cities) {
                    saveCityData(data.cities);
                }

                if (data.propertyTypes) {
                    savePropertyTypeData(data.propertyTypes);
                }
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear timers and state regardless of logout API success
            if (window.refreshTimer) clearTimeout(window.refreshTimer);
            if (window.tokenExpirationTimer) clearTimeout(window.tokenExpirationTimer);
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove('authToken');
        }
    };

    const refreshToken = async () => {
        try {
            const data = await authAPI.refreshToken();

            if (data.status === 0 && data.token) {
                Cookies.set('authToken', data.token, { expires: 1 / 24 });
                const tokenData = JSON.parse(atob(data.token.split('.')[1]));
                const timeUntilExpiry = tokenData.exp * 1000 - Date.now();

                setupRefreshTimer(timeUntilExpiry);
                setupExpirationTimer(timeUntilExpiry);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await handleLogout();
            return false;
        }
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout: handleLogout,
        refreshToken,
        loading,
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;