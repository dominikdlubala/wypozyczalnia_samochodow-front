import { Reservation } from "../../types";
import ReservationItem from "./ReservationItem";

interface ReservationListProps {
  reservationsData: Reservation[];
}

export default function ReservationList({
  reservationsData,
}: ReservationListProps) {
  const sortedReservations = reservationsData.sort((a, b) => {
    const today = new Date().getTime();

    const isActiveA =
      today > new Date(a.startDate).getTime() &&
      today < new Date(a.endDate).getTime();
    const isFinishedA = today > new Date(a.endDate).getTime();

    const isActiveB =
      today > new Date(b.startDate).getTime() &&
      today < new Date(b.endDate).getTime();
    const isFinishedB = today > new Date(b.endDate).getTime();

    if (isActiveA && !isActiveB) return -1;
    if (!isActiveA && isActiveB) return 1;
    if (isFinishedA && !isFinishedB) return 1;
    if (!isFinishedA && isFinishedB) return -1;

    return 0;
  });

  return (
    <div className="list list--reservation">
      {sortedReservations.map((el) => (
        <ReservationItem key={el.id} reservationData={el} />
      ))}
    </div>
  );
}
