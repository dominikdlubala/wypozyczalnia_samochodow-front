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
      .filter((car) => car.model.toLowerCase().startsWith(filter ? filter : ""))
      .map((car) => {
        return (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
            key={car.id}
          >
            <li
              className="gallery-item"
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <img
                className="car-image"
                src={"/images/cars" + car.imageUrl}
                alt="car-img"
              />
              <div className="car-model">{car.model}</div>
            </li>
          </div>
        );
      })
  ) : (
    <div>Nie znaleziono samochodu o Twoich wymaganiach</div>
  );

  return <div className="row">{galleryList}</div>;
}
