import { useState, useEffect, createContext, useContext } from 'react';
import { apiClient } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // We could add a /me endpoint to validate token
            // For now, we'll just set loading to false
            setLoading(false);
        } catch (error) {
            console.error('Auth check failed:', error);
            setLoading(false);
        }
    };

    const signup = async (email, password) => {
        try {
            const result = await apiClient.signup(email, password);
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signin = async (email, password) => {
        try {
            console.log(email, password);
            const result = await apiClient.signin(email, password);
            setUser({ id: result.id });
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signout = () => {
        setUser(null);
        // Clear cookies by setting them to expire
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    const value = {
        user,
        loading,
        signup,
        signin,
        signout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};