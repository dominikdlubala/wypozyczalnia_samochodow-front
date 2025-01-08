import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Reservation, Review } from "../../types";
import Modal from "../primitives/Modal";
import ReviewForm from "../review/ReviewForm";
import FaultForm from "../fault/FaultForm";
import { deleteReservation } from "../../services/ReservationService";
import { useAuth } from "../../hooks/useAuth";
import { getUserReviewForCar } from "../../services/ReviewService";

interface ReservationItemProps {
  reservationData: Reservation;
  onCancel: () => void;
}

export default function ReservationItem({
  reservationData,
  onCancel,
}: ReservationItemProps) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { id, startDate, endDate, car } = reservationData;

  useEffect(() => {
    fetchUserReview();
  }, [token]);

  const fetchUserReview = async () => {
    setIsFetching(true);
    const { data, error } = await getUserReviewForCar(
      reservationData.car.id,
      token as string
    );
    if (data) {
      setReview(data as Review);
    }
    setIsFetching(false);
  };

  const onReviewSubmit = () => {
    fetchUserReview();
  };

  const [review, setReview] = useState<Review>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isFaultModalOpen, setIsFaultModalOpen] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const today = new Date().getTime();
  const isReservationActive =
    today > new Date(startDate).getTime() &&
    today < new Date(endDate).getTime();
  const hasReservationFinished = today > new Date(endDate).getTime();

  const handleCancelReservation = async () => {
    if (!window.confirm("Czy na pewno chcesz anulować tę rezerwację?")) return;

    setIsCanceling(true);
    const { data, error } = await deleteReservation(id, token as string);

    if (error) {
      setIsCanceling(false);
      alert(`Wystąpił błąd: ${error?.message}`);
    } else {
      setIsCanceling(false);
      onCancel();
    }
  };

  // Obliczenie łącznej ceny rezerwacji
  const calculateTotalPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1
    );
    return days * car.pricePerDay;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div
      className={`reservation-card ${
        isReservationActive ? "reservation-card--active" : ""
      } ${hasReservationFinished ? "reservation-card--finished" : ""}`}
    >
      {isReviewModalOpen && (
        <Modal modalClose={() => setIsReviewModalOpen(false)}>
          <ReviewForm
            modalClose={() => setIsReviewModalOpen(false)}
            carId={car.id}
            existingReview={review ?? null}
            onReviewSubmit={onReviewSubmit}
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
        <h3 className="card-title">
          {hasReservationFinished
            ? "Rezerwacja zakończona"
            : isReservationActive
            ? "Rezerwacja w toku"
            : "Rezerwacja zaplanowana"}
        </h3>
        <div className="row g-3 align-items-center">
          <div className="col-6">
            <h2 onClick={() => navigate(`/car/${car.id}`)} role="button">
              {car.brand || "Nie podano"} {car.model || "Nie podano"}
            </h2>
            <p>
              Data rozpoczęcia:{" "}
              <strong>{new Date(startDate).toLocaleDateString()}</strong>
            </p>
            <p>
              Data zakończenia:{" "}
              <strong>{new Date(endDate).toLocaleDateString()}</strong>
            </p>
            <p>
              Łączna cena wynajmu: <strong>{totalPrice} zł</strong>
            </p>

            <div className="col-6 d-flex flex-column mt-3">
              {hasReservationFinished && (
                <button
                  className="btn-add btn-add--review"
                  disabled={isFetching}
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  {isFetching ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : review ? (
                    "Edytuj recenzję"
                  ) : (
                    "Oceń samochód"
                  )}
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
              {!isReservationActive && !hasReservationFinished && (
                <button
                  className="btn-add btn-add--cancel"
                  onClick={handleCancelReservation}
                  disabled={isCanceling}
                >
                  {isCanceling ? "Anuluję..." : "Anuluj rezerwację"}
                </button>
              )}
            </div>
          </div>

          <div className="col-6">
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
        </div>
      </div>
    </div>
  );
}
