import type { Car, MyError, CarApiReturn, CarFilter } from "../types";

const API_URL = "/api/Car";

export const getAllCars = async (): Promise<{
  data: Car[] | null;
  error?: MyError;
}> => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      return {
        data: null,
        error: { error: true, message: "Bad request / getAllCars" },
      };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / getAllCars" },
    };
  }
};

export const getCarById = async (
  id: number
): Promise<{ data: Car | null; error?: MyError }> => {
  try {
    const response = await fetch(`/api/Car/${id}`);
    if (!response.ok) {
      return { data: null, error: { error: true, message: "Car not found" } };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / getCarById" },
    };
  }
};

export const getFilteredCars = async (query: string): Promise<CarApiReturn> => {
  try {
    const response = await fetch(`${API_URL}/filter${query}`);
    if (!response.ok) {
      return {
        data: null,
        error: { error: true, message: "Bad request / getFilteredCars" },
      };
    }
    const data = await response.json();
    if (data === null) {
      return {
        data,
        error: { error: true, message: "Cars not found / getFilteredCars" },
      };
    }
    return { data };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / getFilteredCars" },
    };
  }
};

export const getTopCars = async (): Promise<CarApiReturn> => {
  try {
    const response = await fetch(`${API_URL}/topCars`);
    if (!response.ok)
      return { error: { error: true, message: await response.text() } };
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: { error: true, message: "Unexpected error / getTopCars" } };
  }
};
