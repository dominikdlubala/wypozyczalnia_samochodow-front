import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  registrationDate: string;
  email: string | null;
  username: string;
}

interface DecodedToken {
  nameid: string; // Upewniamy się, że klucz odpowiada temu z payloadu tokena
  unique_name: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Pobierz token z lokalnego storage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Brak tokena. Użytkownik nie jest zalogowany.");
          setLoading(false);
          return;
        }

        // Dekodowanie tokena JWT
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.nameid;

        // Wysłanie zapytania do serwera
        const response = await axios.get<User>(`/api/User/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data || "Wystąpił błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div className="account-page">
      <h1>Moje konto</h1>
      {user ? (
        <div className="account-details">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Imię:</strong> {user.firstName || "Nie podano"}</p>
          <p><strong>Nazwisko:</strong> {user.lastName || "Nie podano"}</p>
          <p><strong>Data rejestracji:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
          <p><strong>Email:</strong> {user.email || "Nie podano"}</p>
          <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
        </div>
      ) : (
        <p>Nie znaleziono użytkownika.</p>
      )}
    </div>
  );
}
