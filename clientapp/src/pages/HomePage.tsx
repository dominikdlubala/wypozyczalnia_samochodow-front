import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTopCars } from "../services/CarService";
import type { Car } from "../types";
import CarFilterForm from "../components/car/CarFilterForm";

export default function HomePage() {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [error, setError] = useState<{ error: boolean; message?: string }>({
    error: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await getTopCars();
        if (error) setError({ error: true, message: error.message });
        else setCars(data as Car[]);
      } catch (error) {
        setError({ error: true, message: "Unexpected error" });
      }
    };

    fetchCars();
  }, []);


  return (
    <div className="container-fluid p-0">
      <div className="form-background p-5 d-flex justify-content-center">
        <div className="form-wrapper">
          <CarFilterForm initialValues={{}} />
        </div>
      </div>

      <div className="gallery--home">
        <h1 className="gallery-title--home text-center">
          Najczęściej wybierane
        </h1>
        <div className="row justify-content-center">
          {cars &&
            cars.map((car) => (
              <div className="col-12 col-md-4 col-lg-2" key={car.id}>
                <div
                  className="gallery-item"
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <img
                    className="car-image img-fluid"
                    src={"/images/cars" + car.imageUrl}
                    alt="car-img"
                  />
                  <div className="car-model">{car.model}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
