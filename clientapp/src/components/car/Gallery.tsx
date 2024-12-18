import { useNavigate } from "react-router-dom";
import type { Car } from "../../types";

export interface GalleryProps {
  filter?: string | null;
  galleryItems: Car[] | null;
  className?: string;
}

export default function Gallery({ filter, galleryItems, className }: GalleryProps) {
  const navigate = useNavigate();

  const filteredCars = galleryItems
  ? galleryItems.filter((car) => {
      const search = filter ? filter.toLowerCase().split(" ") : [];
      return search.every(
        (word) =>
          car.model.toLowerCase().includes(word) ||
          car.brand.toLowerCase().includes(word)
      );
    })
  : [];

  const galleryList = filteredCars.length > 0 ? (
    filteredCars.map((car) => (
      <div
        className="col-lg-4 col-md-4 col-sm-6 col-12 d-flex justify-content-center mt-3"
        key={car.id}
      >
        <li className="gallery-item-allCars">
          <img
            className="car-image-allCars"
            src={"/images/cars/" + car.imageUrl}
            alt="car-img"
            onClick={() => navigate(`/car/${car.id}`)}
          />
          <div className="car-info-allCars">
            <div className="car-info-brandModel-allCars">
              {car.brand} {car.model}
            </div>
            <div>{car.productionYear}</div>
            <div>
              {car.fuelType} {Number(car.capacity).toFixed(1)}L
            </div>
            <div>
              <span className="car-info-span-allCars">
                {car.pricePerDay} zł
              </span>{" "}
              za dobę
            </div>
          </div>
          <button
            className="btn btn-primary btn-submit-allCars"
            type="button"
            onClick={() => navigate(`/car/${car.id}`)}
          >
            Zobacz
          </button>
        </li>
      </div>
    ))
  ) : (
    <div className="allCars-no-results text-center">
      Nie znaleziono samochodów o twoich wymaganiach.
    </div>
  );
  
  return <div className={`row w-100 justify-content-start ${className || ""}`}>{galleryList}</div>;
}
