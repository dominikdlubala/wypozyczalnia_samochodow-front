import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Reservation } from "../../types";
import Modal from "../primitives/Modal";
import ReviewForm from "../review/ReviewForm";
import FaultForm from "../fault/FaultForm";

interface ReservationItemProps {
  reservationData: Reservation;
}

export default function ReservationItem({
  reservationData,
}: ReservationItemProps) {
  const navigate = useNavigate();

  const { id, startDate, endDate, car } = reservationData;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isFaultModalOpen, setIsFaultModalOpen] = useState<boolean>(false);

  const today = new Date().getTime();
  const isReservationActive =
    today > new Date(startDate).getTime() &&
    today < new Date(endDate).getTime();
  const hasReservationFinished = today > new Date(endDate).getTime();

  return (
    <div className="reservation card mb-3">
      {isReviewModalOpen && (
        <Modal modalClose={() => setIsReviewModalOpen(false)}>
          <ReviewForm
            modalClose={() => setIsReviewModalOpen(false)}
            carId={car.id}
          />
        </Modal>
      )}

      {isFaultModalOpen && (
        <Modal modalClose={() => setIsFaultModalOpen(false)}>
          <FaultForm
            modalClose={() => setIsFaultModalOpen(false)}
            carId={car.id}
          />
        </Modal>
      )}

      <div className="card-body">
        <h3 className="card-title">Rezerwacja</h3>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            {car.imageUrl ? (
              <img
                src={"/images/cars" + car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                onClick={() => navigate(`/car/${car.id}`)}
                className="img-fluid rounded"
                role="button"
              />
            ) : (
              <div className="text-muted">Brak zdjęcia</div>
            )}
          </div>

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

          <div className="col-2 d-flex flex-column gap-2">
            {hasReservationFinished && (
              <button
                className="btn-add btn-add--review"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Oceń samochód
              </button>
            )}
            {isReservationActive && (
              <button
                className="btn-add btn-add--fault"
                onClick={() => setIsFaultModalOpen(true)}
              >
                Zgłoś usterkę
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
