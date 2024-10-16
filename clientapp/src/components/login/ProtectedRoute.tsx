import type { ReactElement } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 

export default function ProtectedRoute({ children }: { children: ReactElement<any, any> }) {
    const { user } = useAuth(); 
    if(!user) {
        return <Navigate to={'/login'}/>
    }
    return children; 
}