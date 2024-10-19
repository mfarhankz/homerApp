import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        // In a real app, you would validate credentials here
        // For now, we'll simulate an API call with a delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    setIsAuthenticated(true);
                    setUser({ email, name: 'Reza Shirazi' });
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000); // Simulate network delay
        });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}