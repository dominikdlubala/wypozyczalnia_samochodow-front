import { useNavigate } from "react-router-dom";

import type { Car } from "../../types";

export interface GalleryProps {
  filter?: string | null;
  galleryItems: Car[] | null;
  className?: string;
}

export default function Gallery({ filter, galleryItems, className }: GalleryProps) {
  const navigate = useNavigate();

  const galleryList = galleryItems ? (
    galleryItems
      .filter((car) => {
        const search = filter ? filter.toLowerCase() : "";
        return (
          car.model.toLowerCase().includes(search) || // Wyszukiwanie po modelu
          car.brand.toLowerCase().includes(search) // Wyszukiwanie po marce
        );
      })
      .map((car) => {
        return (
          <div
            className="col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center mt-3"
            key={car.id}
          >
            <li
              className="gallery-item-allCars"
            >
              <img
                className="car-image-allCars"
                src={"/images/cars/" + car.imageUrl}
                alt="car-img"
                onClick={() => navigate(`/car/${car.id}`)}
              />
              <div className="car-info-allCars">
                <div className="car-info-brandModel-allCars">{car.brand} {car.model}</div>
                <div>{car.productionYear}</div>
                <div>{car.fuelType} {Number(car.capacity).toFixed(1)}</div>
                <div><span className="car-info-span-allCars">{car.pricePerDay} zł.</span> za dobę</div>
              </div>
              <button
                className="btn btn-primary btn-submit-allCars"
                type="submit"
                onClick={() => navigate(`/car/${car.id}`)}
                >
                    Zobacz
              </button>
            </li>
          </div>
        );
      })
  ) : (
    <div>Nie znaleziono samochodu o Twoich wymaganiach</div>
  );

  return <div className={`row ${className || ''}`}>{galleryList}</div>;
}
