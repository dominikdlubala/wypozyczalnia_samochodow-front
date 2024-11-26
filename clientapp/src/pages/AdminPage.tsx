import { useEffect, useState } from "react";
import { getAllCars } from "../services/CarService";
import { getUsers } from "../services/UserService";

const AdminPage = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]); // Nowy stan dla użytkowników
  const [error, setError] = useState<string | null>(null);
  const [showCarsTable, setShowCarsTable] = useState(false); // Widoczność tabeli samochodów
  const [showUsersTable, setShowUsersTable] = useState(false); // Widoczność tabeli użytkowników

  const fetchCars = async () => {
    const response = await getAllCars();
    if (response.data) {
      setCars(response.data);
    } else {
      setError(response.error?.message || "Nieoczekiwany błąd");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data); // Ustaw dane użytkowników
    } catch (error) {
      setError("Nie udało się pobrać użytkowników");
    }
  };

  const handleShowCarsTable = () => {
    setShowCarsTable((prev) => !prev);
    if (!showCarsTable) {
      fetchCars();
    }
  };

  const handleShowUsersTable = () => {
    setShowUsersTable((prev) => !prev);
    if (!showUsersTable) {
      fetchUsers();
    }
  };

  return (
    <div className="page page-admin">
      <div className="content-wrapper-admin">
        <h1>Admin Panel</h1>
        <button onClick={handleShowCarsTable} className="btn-show-cars">
          {showCarsTable ? "Ukryj samochody" : "Pokaż samochody"}
        </button>
        <button onClick={handleShowUsersTable} className="btn-show-users">
          {showUsersTable ? "Ukryj użytkowników" : "Pokaż użytkowników"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {showCarsTable && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Marka</th>
                <th>Model</th>
                <th>Typ paliwa</th>
                <th>Pojemność silnika</th>
                <th>Typ nadwozia</th>
                <th>Kolor</th>
                <th>Cena za dzień</th>
                <th>Rok produkcji</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.capacity} L</td>
                  <td>{car.bodyType}</td>
                  <td>{car.color}</td>
                  <td>{car.pricePerDay} PLN</td>
                  <td>{car.productionYear}</td>
                  <td>
                    <button className="btn-action-edit-car">Edytuj</button>
                  </td>
                  <td>
                    <button className="btn-action-delete-car">Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showUsersTable && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Nazwa użytkownika</th>
                <th>Email</th>
                <th>Data rejestracji</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
