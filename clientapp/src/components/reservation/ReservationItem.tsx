import type { Reservation } from "../../types";

interface ReservationItemProps {
    reservationData: Reservation; 
}

export default function ReservationItem({ reservationData }: ReservationItemProps) {

    return (
        <div className="reservation">
            <div className="list-item list-item--reservation" key={reservationData.id}>
                Rezerwacja: {reservationData.id} | {reservationData.startDate.toString()} |{" "}
                {reservationData.endDate.toString()}
            </div>
        </div>
    )
}