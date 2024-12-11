import type { Fault, MyError, AddFault, FaultApiReturn } from '../types';

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

export const addFault = async (
    newFault: AddFault,
    token: string
): Promise<FaultApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                carId: newFault.carId,
                description: newFault.description,
            }),
        });
        if (!response.ok)
            return {
                data: null,
                error: { error: true, message: "Bad request / addFault" },
            };

        return { data: await response.json() };
    } catch (error) {
        return {
            data: null,
            error: { error: true, message: "Unexpected error / addFault" },
        };
    }
};