import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import type { Reservation, MyError } from "../types";
import { getUserReservations } from "../services/ReservationService";
import Error from "../components/primitives/Error";
import ReservationList from "../components/reservation/ReservationList";

export default function ReservationsPage() {
  const { token } = useAuth();

  const [userReservations, setUserReservations] = useState<
    Reservation[] | null
  >(null);
  const [isError, setIsError] = useState<MyError>({ error: false });

  useEffect(() => {
    const fetchReservations = async () => {
      const { data, error } = await getUserReservations(token as string);
      if (error) {
        setIsError(error);
      } else {
        setUserReservations(data as Reservation[]);
      }
    };

    fetchReservations();
  }, [token]);

  let content;
  if (isError.error) {
    content = <Error message={isError.message} />;
  } else if (userReservations && userReservations.length === 0) {
    content = <h2 className="noReservationInfo text-center">Brak rezerwacji.</h2>;
  } else {
    content = userReservations && <ReservationList reservationsData={userReservations}/>
  }

  return (
    <div className="page page-reservations">
      <div className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">MOJE REZERWACJE</h1>
          <p className="banner-description">
            Przeglądaj swoje rezerwacje, zgłaszaj usterki oraz wystawiaj recenzje.
          </p>
        </div>
      </div>
      {content}
    </div>
  );
}
