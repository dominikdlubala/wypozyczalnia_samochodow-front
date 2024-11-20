import { useEffect, useState } from "react";
import { getAllCars } from "../services/CarService";

const AdminPage = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await getAllCars();
      if (response.data) {
        setCars(response.data);
      } else {
        setError(response.error?.message || "Nieoczekiwany błąd");
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="page page-admin">
      <div className="content-wrapper-admin">
        <h1>Admin Panel</h1>
        <h2 className="mt-4">Samochody</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
                <td><button className="btn-action-edit-car">Edytuj</button></td>
                <td><button className="btn-action-delete-car">Usuń</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
