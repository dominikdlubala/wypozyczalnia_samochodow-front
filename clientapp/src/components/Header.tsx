import { Link, useNavigate } from 'react-router-dom'; 

export default function Header() {

    const navigate = useNavigate(); 

    return (
        <div className="header">
            <Link to={'/'} className="logo">Logo</Link>
            <div className="menu">
                <ul className="menu-links">
                    <li className="menu-link" onClick={() => navigate('/contact')}>Kontakt</li>
                    <li className="menu-link" onClick={() => navigate('/login')}>Zaloguj sie</li>
                </ul>
            </div>
        </div>
    )
}