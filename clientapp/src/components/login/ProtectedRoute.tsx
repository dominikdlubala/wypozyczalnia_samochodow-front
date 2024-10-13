import type { ReactNode } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user } = useAuth(); 
    if(!user) {
        return <Navigate to={'/login'}/>
    }
    return children; 
}