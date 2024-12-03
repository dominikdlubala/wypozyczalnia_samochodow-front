import type { Review, ReviewApiReturn } from '../types';

const API_URL = '/api/Review';

export const getAllReviews = async (): Promise<{ data: any[] | null; error?: { error: boolean; message: string } }> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            return { data: null, error: { error: true, message: 'Failed to fetch reviews' } };
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / getAllReviews' } };
    }
};

export const getCarsReviews = async (carId: number): Promise<ReviewApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/car/${carId}`); 
        if(!response.ok) {
            return { data: null, error: { error: true, message: await response.text() } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch (error) {
        return { error: { error: true, message: 'Unexpected error / getCarsReviews' } }; 
    }
}

