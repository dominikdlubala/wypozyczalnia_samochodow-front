import { useEffect, useState } from "react";
import { getAllCars } from "../services/CarService";
import { getUsers } from "../services/UserService";
import { getAllReservations } from "../services/ReservationService";
import { getAllReviews } from "../services/ReviewService";
import { getAllFaults } from "../services/FaultService";

const AdminPage = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]); // Stan dla rezerwacji
  const [reviews, setReviews] = useState<any[]>([]);
  const [faults, setFaults] = useState<any[]>([]); // Stan dla usterek
  const [error, setError] = useState<string | null>(null);
  const [showCarsTable, setShowCarsTable] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);
  const [showReservationsTable, setShowReservationsTable] = useState(false); // Widoczność tabeli rezerwacji
  const [showReviewsTable, setShowReviewsTable] = useState(false);
  const [showFaultsTable, setShowFaultsTable] = useState(false); // Widoczność tabeli usterek

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
      setUsers(data);
    } catch {
      setError("Nie udało się pobrać użytkowników");
    }
  };

  const fetchReservations = async () => {
    const response = await getAllReservations();
    if (response.data) {
      setReservations(response.data);
    } else {
      setError(response.error?.message || "Nie udało się pobrać rezerwacji");
    }
  };

  const fetchReviews = async () => {
    const response = await getAllReviews();
    if (response.data) {
        setReviews(response.data);
    } else {
        setError(response.error?.message || "Nie udało się pobrać recenzji");
    }
  };

  const fetchFaults = async () => {
    const response = await getAllFaults();
    if (response.data) {
        setFaults(response.data);
    } else {
        setError(response.error?.message || "Nie udało się pobrać usterek");
    }
  };

  const handleShowCarsTable = () => {
    setShowCarsTable((prev) => !prev);
    if (!showCarsTable) fetchCars();
  };

  const handleShowUsersTable = () => {
    setShowUsersTable((prev) => !prev);
    if (!showUsersTable) fetchUsers();
  };

  const handleShowReservationsTable = () => {
    setShowReservationsTable((prev) => !prev);
    if (!showReservationsTable) fetchReservations();
  };

  const handleShowReviewsTable = () => {
    setShowReviewsTable((prev) => !prev);
    if (!showReviewsTable) fetchReviews();
  };

  const handleShowFaultsTable = () => {
    setShowFaultsTable((prev) => !prev);
    if (!showFaultsTable) fetchFaults();
  };

  return (
    <div className="page page-admin">
      <div className="content-wrapper-admin">
        <h1>Admin Panel</h1>
        
        <div className="d-flex justify-content-between flex-wrap gap-2 mb-4">
          <button onClick={handleShowCarsTable} className="btn btn-primary">
            {showCarsTable ? "Ukryj samochody" : "Pokaż samochody"}
          </button>
          <button onClick={handleShowUsersTable} className="btn btn-primary">
            {showUsersTable ? "Ukryj użytkowników" : "Pokaż użytkowników"}
          </button>
          <button onClick={handleShowReservationsTable} className="btn btn-primary">
            {showReservationsTable ? "Ukryj rezerwacje" : "Pokaż rezerwacje"}
          </button>
          <button onClick={handleShowReviewsTable} className="btn btn-primary">
            {showReviewsTable ? "Ukryj recenzje" : "Pokaż recenzje"}
          </button>
          <button onClick={handleShowFaultsTable} className="btn btn-primary">
            {showFaultsTable ? "Ukryj usterki" : "Pokaż usterki"}
          </button>
        </div>

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
                <th></th>
                <th></th>
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
                    <button className="btn btn-warning btn-sm">Edytuj</button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm">Usuń</button>
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
                <th></th>
                <th></th>
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
                  <td>
                    <button className="btn btn-warning btn-sm">Edytuj</button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm">Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showReservationsTable && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Samochód</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.userName}</td>
                  <td>{reservation.carName}</td>
                  <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                  <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edytuj</button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm">Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showReviewsTable && (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Samochód</th>
                        <th>Użytkownik</th>
                        <th>Ocena</th>
                        <th>Recenzja</th>
                        <th>Data dodania</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.carName}</td>
                            <td>{review.userName}</td>
                            <td>{review.starsOutOfFive}</td>
                            <td>{review.reviewContent}</td>
                            <td>{new Date(review.dateOfIssue).toLocaleDateString()}</td>
                            <td>
                              <button className="btn btn-warning btn-sm">Edytuj</button>
                            </td>
                            <td>
                              <button className="btn btn-danger btn-sm">Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        {showFaultsTable && (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Samochód</th>
                        <th>Zgłaszający</th>
                        <th>Opis</th>
                        <th>Data zgłoszenia</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {faults.map((fault) => (
                        <tr key={fault.id}>
                            <td>{fault.id}</td>
                            <td>{fault.carName}</td>
                            <td>{fault.reportedUserName}</td>
                            <td>{fault.description}</td>
                            <td>{new Date(fault.dateOfIssue).toLocaleDateString()}</td>
                            <td>
                              <button className="btn btn-warning btn-sm">Edytuj</button>
                            </td>
                            <td>
                              <button className="btn btn-danger btn-sm">Usuń</button>
                            </td>
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
