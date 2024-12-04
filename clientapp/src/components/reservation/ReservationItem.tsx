import type { Reservation } from "../../types";

interface ReservationItemProps {
  reservationData: Reservation;
}

export default function ReservationItem({
  reservationData,
}: ReservationItemProps) {
  const { id, startDate, endDate, car } = reservationData;

  return (
    <div className="reservation card mb-3">
      <div className="card-body">
        <h3 className="card-title">Rezerwacja #{id}</h3>
        <div className="row g-3 align-items-center">
          {/* Zdjęcie samochodu */}
          <div className="col-4">
            {car.imageUrl ? (
              <img
                src={"/images/cars" + car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="img-fluid rounded border"
              />
            ) : (
              <div className="text-muted">Brak zdjęcia</div>
            )}
          </div>

          {/* Szczegóły rezerwacji */}
          <div className="col-8">
            <h4>
              {car.brand || "Nie podano"} {car.model || "Nie podano"}
            </h4>
            <p>
              <strong>Data rozpoczęcia:</strong>{" "}
              {new Date(startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Data zakończenia:</strong>{" "}
              {new Date(endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
