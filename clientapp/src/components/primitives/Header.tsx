import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role, logout } = useAuth();

  return (
    <div className="header">
      <Link to={"/"} className="logo fs-2 fs-md-1 fs-sm-3">
        <img src="/images/logo.png" alt="Logo" className="logo-image" />
      </Link>
      <div className="menu">
        <ul className="menu-links d-flex gap-3 list-unstyled mb-0">
          <li
            className={`menu-link fs-md-5 fs-sm-4 ${
              location.pathname === "/" ? "active" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Start
          </li>
          <li
            className={`menu-link fs-md-5 fs-sm-4 ${
              location.pathname === "/cars" ? "active" : ""
            }`}
            onClick={() => navigate("/cars")}
          >
            Flota
          </li>
          {token && (
            <>
              <li
                className={`menu-link fs-md-5 fs-sm-4 ${
                  location.pathname === "/reservations" ? "active" : ""
                }`}
                onClick={() => navigate("/reservations", { state: { token } })}
              >
                Moje rezerwacje
              </li>
              <li
                className={`menu-link fs-md-5 fs-sm-4 ${
                  location.pathname === "/account" ? "active" : ""
                }`}
                onClick={() => navigate("/account")}
              >
                Konto
              </li>
            </>
          )}
          {role === "Admin" && (
            <li
              className={`menu-link fs-md-5 fs-sm-4 ${
                location.pathname === "/admin" ? "active" : ""
              }`}
              onClick={() => navigate("/admin")}
            >
              Admin panel
            </li>
          )}
          {token ? (
            <li
              className="menu-link fs-md-5 fs-sm-4"
              onClick={() => logout()}
            >
              Wyloguj się
            </li>
          ) : (
            <li
              className={`menu-link fs-md-5 fs-sm-4 ${
                location.pathname === "/login" ? "active" : ""
              }`}
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
