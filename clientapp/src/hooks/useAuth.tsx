import { createContext, useContext, useMemo, useEffect } from 'react'; 
import type { ReactNode } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useLocalStorage } from './useLocalStorage'; 
import { User } from '../types'; 

interface AuthContextType {
    user: Omit<User, 'id'> | null; 
    login: (user: Omit<User, 'id'>, path?: string) => void; 
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useLocalStorage<Omit<User, 'id'> | null>('user', null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if(user) {
            setUser(user); 
        } else {
            logout(); 
        }
    }, []); 

    const login = (user: Omit<User, 'id'>, path: string = '/') => {
        setUser(user); 
        navigate(path); 
    }

    const logout = () => {
        setUser(null); 
        navigate('/', { replace: true })
    }

    const value = useMemo(
        () => ({
            user, 
            login, 
            logout
        }),
        [user]
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
