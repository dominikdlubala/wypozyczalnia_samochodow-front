import React, { useEffect, useState } from "react";
import { getUser, updateUser, changePassword } from "../services/UserService";

interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  registrationDate: Date;
  email: string | null;
  username: string;
}

export default function AccountPage() {
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
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Brak tokena. Użytkownik nie jest zalogowany.");
          setLoading(false);
          return;
        }

        const userId = parseInt(JSON.parse(atob(token.split(".")[1])).nameid);
        const fetchedUser = await getUser(userId);

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
      await updateUser(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      });
      setSuccess("Dane zostały zaktualizowane.");
    } catch (error: any) {
      setError("Nie udało się zaktualizować danych użytkownika.");
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
      return;
    }

    try {
      await changePassword(user.id, currentPassword, newPassword);
      setPasswordSuccess("Hasło zostało zmienione.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setPasswordError(
        "Nie udało się zmienić hasła. Sprawdź, czy aktualne hasło jest poprawne."
      );
    }
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div className="account-page">
      <h1>Moje konto</h1>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Imię:</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nazwisko:</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nazwa użytkownika:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Zapisz zmiany</button>
          </form>

          <h2>Zmiana hasła</h2>
          {passwordSuccess && (
            <p style={{ color: "green" }}>{passwordSuccess}</p>
          )}
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="form-group">
              <label>Aktualne hasło:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Nowe hasło:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Potwierdzenie nowego hasła:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button type="submit">Zmień hasło</button>
          </form>
        </>
      ) : (
        <p>Nie znaleziono użytkownika.</p>
      )}
    </div>
  );
}
