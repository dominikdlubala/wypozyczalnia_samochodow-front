import { useState, useEffect } from 'react'; 
import { useAuth } from '../hooks/useAuth'; 

import type { User, Reservation, MyError } from '../types'; 
import { getUserReservations } from '../services/ReservationService';
import Error from '../components/primitives/Error'; 

export default function ReservationsPage() {
    const { token } = useAuth();   

    const [userReservations, setUserReservations] = useState<Reservation[] | null>(null);
    const [isError, setIsError] = useState<MyError>({ error: false });  

    useEffect(() => {
        const fetchReservations = async () => {
            const { data, error } = await getUserReservations(token as string); 
            if(error) setIsError(error); 
            setUserReservations(data as Reservation[])
        }

        fetchReservations(); 
    }, [token])

    let content; 
    content = userReservations?.map(el => (
        <li className="list-item list-item--reservation" key={el.id}>
            Rezerwacja: {el.id} | {el.startDate.toString()} | {el.endDate.toString()}; 
        </li>
    ))
    if(isError.error === true){
        content = <Error message={isError.message} />
    }

    return (
        <div className="page page-reservations">
            <ul className="list list--reservation">
                {content}
            </ul>
        </div>
    )
}