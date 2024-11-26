import type { Fault, MyError } from '../types';

const API_URL = '/api/Fault';

export const getAllFaults = async (): Promise<{ data: Fault[] | null; error?: MyError | null }> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            return { data: null, error: { error: true, message: 'Failed to fetch faults' } };
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        return { data: null, error: { error: true, message: 'Unexpected error / getAllFaults' } };
    }
};
