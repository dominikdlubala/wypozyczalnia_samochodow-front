import { Outlet } from 'react-router-dom'; 
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import { AuthProvider } from '../hooks/useAuth'; 

export default function Root() {
    return (
        <div>
            <AuthProvider>
                <Header/>
                <Outlet />
                <Footer/>
            </AuthProvider>
        </div>
    )
}