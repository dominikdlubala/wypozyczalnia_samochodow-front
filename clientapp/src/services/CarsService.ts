import type { Car, MyError, CarApiReturn, CarFilter } from '../types'; 

const API_URL = '/api/Car'; 

export const getAllCars = async (): Promise<CarApiReturn> => {
    try {
        const response = await fetch(API_URL);
        if(!response.ok){
            return { data: null, error: { error: true, message: 'Bad request / getAllCars'}}
        }
        const data = await response.json(); 
        if(data !== null){
            return { data }; 
        }
        return { data: null, error: { error: true, message: 'Data not found / getAllCars' } }; 
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / getAllCars' } }
    }
}

export const getFilteredCars = async (query: string): Promise<CarApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/filter${query}`)
        if(!response.ok){
            return { data: null, error: { error: true, message: 'Bad request / getFilteredCars' } }; 
        }
        const data = await response.json(); 
        if(data === null){
            return { data, error: { error: true, message: 'Cars not found / getFilteredCars' } }; 
        }
        return { data }; 
    } catch (error){
        return { data: null, error: { error: true, message: 'Unexpected error / getFilteredCars' } }
    }
}