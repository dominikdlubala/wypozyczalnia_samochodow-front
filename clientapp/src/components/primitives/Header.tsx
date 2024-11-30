import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { token, role, logout } = useAuth();

  return (
    <div className="header">
      <Link to={"/"} className="logo fs-2 fs-md-1 fs-sm-3">
        Logo
      </Link>
      <div className="menu">
        <ul className="menu-links d-flex gap-3 list-unstyled mb-0">
          <li
            className="menu-link fs-6 fs-md-5 fs-sm-4"
            onClick={() => navigate("/cars")}
          >
            Flota
          </li>
          {token && (
            <>
              <li
                className="menu-link fs-6 fs-md-5 fs-sm-4"
                onClick={() => navigate("/reservations", { state: { token } })}
              >
                Moje rezerwacje
              </li>
              <li
                className="menu-link fs-6 fs-md-5 fs-sm-4"
                onClick={() => navigate("/account")}
              >
                Konto
              </li>
            </>
          )}
          {role === "Admin" && (
            <li
              className="menu-link fs-6 fs-md-5 fs-sm-4"
              onClick={() => navigate("/admin")}
            >
              Admin panel
            </li>
          )}
          {token ? (
            <li
              className="menu-link fs-6 fs-md-5 fs-sm-4"
              onClick={() => logout()}
            >
              Wyloguj się
            </li>
          ) : (
            <li
              className="menu-link fs-6 fs-md-5 fs-sm-4"
              onClick={() => navigate("/login")}
            >
              Zaloguj się
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
