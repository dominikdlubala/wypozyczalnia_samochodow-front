import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { token, role, logout } = useAuth();
  console.log(role);

  return (
    <div className="header">
      <Link to={"/"} className="logo">
        Logo
      </Link>
      <div className="menu">
        <ul className="menu-links">
          <li className="menu-link" onClick={() => navigate("/cars")}>
            Flota
          </li>
          {token && (
            <>
              <li
                className="menu-link"
                onClick={() => navigate("/reservations", { state: { token } })}
              >
                Moje rezerwacje
              </li>
              <li className="menu-link" onClick={() => navigate("/account")}>
                Konto
              </li>
            </>
          )}
          {role === "Admin" && (
            <li className="menu-link" onClick={() => navigate("/admin")}>
              Admin panel
            </li>
          )}
          {token ? (
            <li className="menu-link" onClick={() => logout()}>
              Wyloguj się
            </li>
          ) : (
            <li className="menu-link" onClick={() => navigate("/login")}>
              Zaloguj się
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
