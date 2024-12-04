import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Reservation } from "../../types";
import Modal from "../primitives/Modal";
import ReviewForm from "../review/ReviewForm";

interface ReservationItemProps {
  reservationData: Reservation;
}

export default function ReservationItem({
  reservationData,
}: ReservationItemProps) {
  const navigate = useNavigate();

  const { id, startDate, endDate, car } = reservationData;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const today = new Date().getTime();
  const isReservationActive =
    today > new Date(startDate).getTime() &&
    today < new Date(endDate).getTime();
  const hasReservationFinished = today > new Date(endDate).getTime();

  return (
    <div className="reservation card mb-3">
      {isModalOpen && (
        <Modal modalClose={() => setIsModalOpen(false)}>
          <ReviewForm modalClose={() => setIsModalOpen(false)} carId={car.id} />
        </Modal>
      )}

      <div className="card-body">
        <h3 className="card-title">Rezerwacja #{id}</h3>
        <div className="row g-3 align-items-center">
          {/* Zdjęcie samochodu */}
          <div className="col-4">
            {car.imageUrl ? (
              <img
                src={"/images/cars" + car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                onClick={() => navigate(`/car/${car.id}`)}
                className="img-fluid rounded border"
                role="button"
              />
            ) : (
              <div className="text-muted">Brak zdjęcia</div>
            )}
          </div>

          {/* Szczegóły rezerwacji */}
          <div className="col-6">
            <h4 onClick={() => navigate(`/car/${car.id}`)} role="button">
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

          <div className="col-2">
            {hasReservationFinished && (
              <button
                className="btn-add btn-add--review"
                onClick={() => setIsModalOpen(true)}
              >
                Oceń samochód
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
