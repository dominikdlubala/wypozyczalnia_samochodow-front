import { useEffect, useState } from "react";
import { getAllCars } from "../services/CarService";
import { getAllReservations } from "../services/ReservationService";
import { getAllReviews } from "../services/ReviewService";
import { getAllFaults } from "../services/FaultService";
import Modal from "../components/primitives/Modal";
import AddOrEditCarForm from "../components/car/AddOrEditCarForm";
import { Car } from "../types";
import { deleteCar, getUsers } from "../services/AdminService";
import { useAuth } from "../hooks/useAuth";

const AdminPage = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [faults, setFaults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showCarsTable, setShowCarsTable] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);
  const [showReservationsTable, setShowReservationsTable] = useState(false);
  const [showReviewsTable, setShowReviewsTable] = useState(false);
  const [showFaultsTable, setShowFaultsTable] = useState(false);

  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [car, setCar] = useState<Car | null>(null);

  const { token } = useAuth();

  const handleDeleteCar = async (carId: number) => {
    const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć ten samochód?"
    );
    if (confirmed) {
      try {
        await deleteCar(carId, token || "");
        fetchCars();
      } catch (error) {
        setError("Nie udało się usunąć samochodu");
      }
    }
  };

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
      const data = await getUsers(token || "");
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
      <div className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">PANEL ADMINISTRATORA</h1>
          <p className="banner-description"></p>
        </div>
      </div>

      <div className="content-wrapper-admin">
        {isCarModalOpen && (
          <Modal modalClose={() => setIsCarModalOpen(false)}>
            <AddOrEditCarForm
              modalClose={() => {
                setIsCarModalOpen(false);
              }}
              onSubmited={() => {
                fetchCars();
              }}
              car={car}
            />
          </Modal>
        )}

        <div className="d-flex justify-content-between flex-wrap gap-2 mb-4">
          <button
            onClick={handleShowCarsTable}
            className={`btn ${showCarsTable ? "btn-success" : "btn-primary"}`}
          >
            {showCarsTable ? "Ukryj samochody" : "Pokaż samochody"}
          </button>
          <button
            onClick={handleShowUsersTable}
            className={`btn ${showUsersTable ? "btn-success" : "btn-primary"}`}
          >
            {showUsersTable ? "Ukryj użytkowników" : "Pokaż użytkowników"}
          </button>
          <button
            onClick={handleShowReservationsTable}
            className={`btn ${
              showReservationsTable ? "btn-success" : "btn-primary"
            }`}
          >
            {showReservationsTable ? "Ukryj rezerwacje" : "Pokaż rezerwacje"}
          </button>
          <button
            onClick={handleShowReviewsTable}
            className={`btn ${
              showReviewsTable ? "btn-success" : "btn-primary"
            }`}
          >
            {showReviewsTable ? "Ukryj recenzje" : "Pokaż recenzje"}
          </button>
          <button
            onClick={handleShowFaultsTable}
            className={`btn ${showFaultsTable ? "btn-success" : "btn-primary"}`}
          >
            {showFaultsTable ? "Ukryj usterki" : "Pokaż usterki"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {showCarsTable && (
          <div>
            <div className="text-center">
              <h3>Samochody</h3>
              <button
                className="btn btn-success"
                onClick={() => {
                  setIsCarModalOpen(true);
                  setCar(null);
                }}
              >
                Dodaj samochód
              </button>
            </div>
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
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setIsCarModalOpen(true);
                          setCar(car);
                        }}
                      >
                        Edytuj
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        Usuń
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showUsersTable && (
          <div>
            <div className="text-center">
              <h3>Użytkownicy</h3>
            </div>
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
                    <td>
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showReservationsTable && (
          <div>
            <div className="text-center">
              <h3>Rezerwacje</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Użytkownik</th>
                  <th>Samochód</th>
                  <th>Data rozpoczęcia</th>
                  <th>Data zakończenia</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.userName}</td>
                    <td>{reservation.carName}</td>
                    <td>
                      {new Date(reservation.startDate).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(reservation.endDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showReviewsTable && (
          <div>
            <div className="text-center">
              <h3>Recenzje</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Samochód</th>
                  <th>Użytkownik</th>
                  <th>Ocena</th>
                  <th>Recenzja</th>
                  <th>Data dodania</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showFaultsTable && (
          <div>
            <div className="text-center">
              <h3>Usterki</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Samochód</th>
                  <th>Zgłaszający</th>
                  <th>Opis</th>
                  <th>Data zgłoszenia</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
