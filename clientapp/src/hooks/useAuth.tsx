import { createContext, useContext, useMemo, useEffect } from 'react'; 
import type { ReactNode } from 'react'; 
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from './useLocalStorage'; 
import type { UserLoginApiReturn } from '../types'; 
import { loginUser } from '../services/UserService'; 

interface AuthContextType {
    token: string | null; 
    login: ({ username, password}: {username: string, password: string}, path?: string) => Promise<UserLoginApiReturn>; 
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useLocalStorage<string | null>('token', null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if(token) {
            setToken(token); 
        } else {
            logout(); 
        }
    }, []); 

    const login = async ({username, password}: { username: string, password: string }, path: string = '/'): Promise<UserLoginApiReturn> => {
        try {   
            const { token, error } = await loginUser(username, password) 

            if(token !== null) {
                setToken(token); 
                navigate(path); 
                return { token }
            }
            return { token: null, error }; 
        } catch (error) {
            return { token: null, error } as UserLoginApiReturn; 
        }
    }

    const logout = () => {
        setToken(null); 
        navigate('/login', { replace: true })
    }

    const value = useMemo(
        () => ({
            token, 
            login, 
            logout
        }),
        [token]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext); 
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider'); 
    }
    return context; 
}
