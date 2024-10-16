import { useLocation } from 'react-router-dom'; 

const reservations = [
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '},
    { name: 'rezerwacja '}
]

export default function ReservationsPage() {
    const { state: { user } } = useLocation(); 

    const reservationsList = reservations.map(el => (
        <li className="list-item list-item--reservation" key={Math.random()}>{el.name}</li>
    ))

    return (
        <div className="page page-reservations">
            <ul className="list list--reservation">
                {reservationsList}
            </ul>
        </div>
    )
}