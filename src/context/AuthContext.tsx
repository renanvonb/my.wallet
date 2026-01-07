import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => Promise<void>;
    signup: (name: string, email: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>({ name: 'Test User', email: 'test@example.com' });

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('mywallet_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password?: string) => {
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // Simple mock login: check if local storage has a matching user logic could be here
                // For this demo, we just simulate a successful login if we find any user or just set a new session
                // Let's actually find the user in "database" (another localStorage key)
                const dbUsersString = localStorage.getItem('mywallet_db_users');
                const dbUsers: User[] = dbUsersString ? JSON.parse(dbUsersString) : [];

                const foundUser = dbUsers.find(u => u.email === email);

                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('mywallet_user', JSON.stringify(foundUser));
                    resolve();
                } else {
                    // Fallback for demo specific email if no DB
                    if (email === 'test@example.com') {
                        const demoUser = { name: 'Test User', email: 'test@example.com' };
                        setUser(demoUser);
                        localStorage.setItem('mywallet_user', JSON.stringify(demoUser));
                        resolve();
                        return;
                    }
                    reject(new Error('Usuário não encontrado. Por favor, cadastre-se.'));
                }
            }, 800);
        });
    };

    const signup = async (name: string, email: string) => {
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const dbUsersString = localStorage.getItem('mywallet_db_users');
                const dbUsers: User[] = dbUsersString ? JSON.parse(dbUsersString) : [];

                if (dbUsers.find(u => u.email === email)) {
                    reject(new Error('E-mail já cadastrado'));
                    return;
                }

                const newUser: User = { name, email };
                dbUsers.push(newUser);
                localStorage.setItem('mywallet_db_users', JSON.stringify(dbUsers));

                // Auto login after signup
                setUser(newUser);
                localStorage.setItem('mywallet_user', JSON.stringify(newUser));
                resolve();
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mywallet_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
