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

    useEffect(() => {
        const token = Cookies.get('authToken')
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1]))
            console.log(tokenData);
            if (Date.now() >= tokenData.exp * 1000) {
                logout()
            } else {
                console.log('Token is still valid');
            }
        }
    }, [])

    const login = async (email, password) => {
        const apiEndpoint = import.meta.env.VITE_Homer_API_Base_Url;
        const response = await axios.post(`${apiEndpoint}/Account/signin`, {
            userName: email,
            password: password,
        });

        const { userName, displayName, isActive, status, message, token } = response.data;

        if (status === 0) {
            setIsAuthenticated(true);
            setUser({ userName, displayName, isActive });
            // Store token in cookie (expires in 1 hour)
            Cookies.set('authToken', token, { expires: 1 / 24 });
            // Set up timer for token expiration
            setTimeout(logout, 3600000); // 1 hour in milliseconds

        } else {
            const error = new Error(message);
            error.status = status;
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('authToken')
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}