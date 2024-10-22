import type { Reservation, ReservationApiReturn } from '../types'; 

const API_URL = '/api/Reservation'; 



export const getUserReservations = async (token: string): Promise<ReservationApiReturn> => {
    try{
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }); 
        if(!response.ok) {
            return { data: null, error: { error: true, message: 'Bad request / getUserReservations' } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / getUserReservations' } } 
    }
}

export const addReservation = async (newReservation: Omit<Reservation, 'id' & 'userId'>, token: string): Promise<ReservationApiReturn> => {

    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json', 
                'Authorization': 'Bearer ' + token
            }, 
            body: JSON.stringify({
                'CarId': newReservation.carId, 
                'StartDate': newReservation.startDate,
                'EndDate': newReservation.endDate
            })
        }); 
        if(!response.ok) return { data: null, error: { error: true, message: 'Bad request / addReservation' } } 

        return { data: await response.json() }; 
    } catch (error) {
        console.error(error); 
        return { data: null, error: { error: true, message: 'Unexpected error / addReservation' } }
    }
}