import { createContext, useContext, useEffect, useState } from 'react';
import { getMyDetails } from '../service/auth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            getMyDetails()
                .then((data) => setUser(data))
                .catch((err) => {
                    setUser(null);
                    console.error('Failed to fetch user details:', err);
                })
                .finally(() => setLoading(false));
        }
        else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
}