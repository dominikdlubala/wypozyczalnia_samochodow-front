import { Link, useNavigate } from 'react-router-dom'; 

import { useAuth } from '../../hooks/useAuth'; 

export default function Header() {

    const navigate = useNavigate(); 
    const { user, logout } = useAuth(); 

    return (
        <div className="header">
            <Link to={'/'} className="logo">Logo</Link>
            <div className="menu">
                <ul className="menu-links">
                    <li className="menu-link" onClick={() => navigate('/cars')}>Flota</li>
                    { user && <li className="menu-link" onClick={() => navigate('/reservations', { state: { user }})}>Moje rezerwacje</li>}
                    {
                        user 
                        ? 
                        <li className="menu-link" onClick={() => logout()}>Wyloguj się</li>
                        :
                        <li className="menu-link" onClick={() => navigate('/login')}>Zaloguj sie</li>
                    }
                </ul>
            </div>           
        </div>
    )
}