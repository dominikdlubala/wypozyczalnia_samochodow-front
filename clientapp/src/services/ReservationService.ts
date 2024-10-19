import type { Reservation, ReservationApiReturn } from '../types'; 

const API_URL = '/api/Reservation'; 

export const getUserReservations = async (userId: number): Promise<ReservationApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/user${userId}`); 
        if(!response.ok) {
            return { data: null, error: { error: true, message: 'Bad request / getUserReservations' } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / getUserReservations' } } 
    }
}

export const addReservation = async (newReservation: Omit<Reservation, 'id'>): Promise<ReservationApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                'UserId': newReservation.userId,
                'CarId': newReservation.carId, 
                'StartDate': newReservation.startDate,
                'EndDate': newReservation.endDate
            })
        }); 
        if(!response.ok) return { data: null, error: { error: true, message: 'Bad request / addReservation' } }

        const data = await response.json(); 
        return { data }; 
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / addReservation' } }
    }
}