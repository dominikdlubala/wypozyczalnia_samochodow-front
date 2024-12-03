import { Reservation } from "../../types";
import ReservationItem from "./ReservationItem";

interface ReservationListProps {
    reservationsData: Reservation[]; 
}

export default function ReservationList({ reservationsData }: ReservationListProps) {

    return (
        <div className="list list--reservation">
            {
                reservationsData.map(el => <ReservationItem key={el.id} reservationData={el} />)
            }
        </div>
    )
}