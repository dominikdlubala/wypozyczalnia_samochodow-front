import { createContext, useContext, useMemo, useEffect } from 'react'; 
import type { ReactNode } from 'react'; 
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from './useLocalStorage'; 
import type { User, UserApiReturn, MyError } from '../types'; 
import { findUser } from '../services/UserService'; 

interface AuthContextType {
    user: Omit<User, 'id'> | null; 
    login: ({ username, password}: {username: string, password: string}, path?: string) => Promise<UserApiReturn>; 
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

    const login = async ({username, password}: { username: string, password: string }, path: string = '/')=> {
        try {   
            const { data: user, error } = await findUser(username, password) as { data: User, error: MyError }; 

            if(user !== null) {
                setUser(user); 
                navigate(path); 
                return { data: user }
            }
            return { data: null, error } as { data: User | null, error: MyError }
        } catch (error) {
            return { data: null, error } as { data: User | null, error: MyError }
        }
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
