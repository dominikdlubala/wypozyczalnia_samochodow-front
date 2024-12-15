import { useNavigate } from "react-router-dom";

import type { Car } from "../../types";

export interface GalleryProps {
  filter?: string | null;
  galleryItems: Car[] | null;
}

export default function Gallery({ filter, galleryItems }: GalleryProps) {
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
            className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mt-3"
            key={car.id}
          >
            <li
              className="gallery-item-allCars"
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <img
                className="car-image-allCars"
                src={"/images/cars/" + car.imageUrl}
                alt="car-img"
              />
              <div className="car-model-allCars">
                {car.brand} {car.model}
              </div>
            </li>
          </div>
        );
      })
  ) : (
    <div>Nie znaleziono samochodu o Twoich wymaganiach</div>
  );

  return <div className="row">{galleryList}</div>;
}
