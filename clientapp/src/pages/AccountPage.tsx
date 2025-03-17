import React, { useEffect, useState } from "react";
import { getUser, updateUser, changePassword } from "../services/UserService";
import { useAuth } from "../hooks/useAuth";
import Prompt from "../components/primitives/Prompt";

interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  registrationDate: Date;
  email: string | null;
  username: string;
}

export default function AccountPage() {
  const { token } = useAuth();

  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setError("Brak tokena. Użytkownik nie jest zalogowany.");
          setLoading(false);
          return;
        }

        const userId = parseInt(JSON.parse(atob(token.split(".")[1])).nameid);
        const fetchedUser = await getUser(token, userId);

        const normalizedUser: User = {
          ...fetchedUser,
          firstName: fetchedUser.firstName ?? null,
          lastName: fetchedUser.lastName ?? null,
          registrationDate: fetchedUser.registrationDate ?? new Date(),
        };

        setUser(normalizedUser);
      } catch (error: any) {
        setError("Nie udało się pobrać danych użytkownika.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) return;

    try {
      await updateUser(
        user.id,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        },
        token as string
      );
      setSuccess("Dane zostały zaktualizowane.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error: any) {
      setError("Nie udało się zaktualizować danych użytkownika.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!user) return;

    // Walidacja, czy nowe hasło i potwierdzenie hasła są takie same
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Nowe hasło i jego potwierdzenie muszą być takie same.");
      setTimeout(() => setPasswordError(null), 3000);
      return;
    }

    try {
      await changePassword(user.id, currentPassword, newPassword, token);
      setPasswordSuccess("Hasło zostało zmienione.");
      setTimeout(() => setPasswordSuccess(null), 3000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setPasswordError(
        "Nie udało się zmienić hasła. Sprawdź, czy aktualne hasło jest poprawne."
      );
      setTimeout(() => setPasswordError(null), 3000);
    }
  };

  //if (loading) return <p>Ładowanie...</p>;
  //if (error) return <p>Błąd: {error}</p>;

  return (
    <div className="page-account">
      {success && (
        <Prompt success handleClose={() => setSuccess(null)}>
          {success}
        </Prompt>
      )}
      {error && (
        <Prompt error handleClose={() => setError(null)}>
          {error}
        </Prompt>
      )}
      {passwordSuccess && (
        <Prompt success handleClose={() => setPasswordSuccess(null)}>
          {passwordSuccess}
        </Prompt>
      )}
      {passwordError && (
        <Prompt error handleClose={() => setPasswordError(null)}>
          {passwordError}
        </Prompt>
      )}

      <div className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">PANEL UŻYTKOWNIKA</h1>
          <p className="banner-description">
            Tutaj możesz edytować swoje dane użytkownika oraz zmienić hasło.
          </p>
        </div>
      </div>

      <div className="content-wrapper-account">
        <h2>Moje dane</h2>
        {success && <p className="prompt-success">{success}</p>}
        {error && <p className="prompt-error">{error}</p>}
        {user ? (
          <>
            <form onSubmit={handleFormSubmit} className="form-account">
              <div className="form-group">
                <label>Imię:</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Nazwisko:</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Nazwa użytkownika:</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Zapisz zmiany
                </button>
              </div>
            </form>

            <h2 className="mt-4">Zmiana hasła</h2>
            {passwordSuccess && (
              <p className="prompt-success">{passwordSuccess}</p>
            )}
            {passwordError && <p className="prompt-error">{passwordError}</p>}
            <form
              onSubmit={handlePasswordChangeSubmit}
              className="form-account"
            >
              <div className="form-group">
                <label>Aktualne hasło:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Nowe hasło:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Potwierdzenie nowego hasła:</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Zmień hasło
                </button>
              </div>
            </form>
          </>
        ) : (
          <p>Nie znaleziono użytkownika.</p>
        )}
      </div>
    </div>
  );
}
