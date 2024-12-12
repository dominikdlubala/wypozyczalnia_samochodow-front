import { Car, CarApiReturn } from "../types";

const API_URL = "/api/admin";

export const addCar = async (
  newCar: Omit<Car, "id">,
  token: string
): Promise<CarApiReturn> => {
  try {
    const response = await fetch(API_URL + "/car", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newCar),
    });
    if (!response.ok)
      return {
        data: null,
        error: { error: true, message: "Bad request / addCar" },
      };

    return { data: await response.json() };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / addCar" },
    };
  }
};

export const updateCar = async (
  carId: number,
  carToUpdate: Omit<Car, "id">,
  token: string
): Promise<CarApiReturn> => {
  try {
    const response = await fetch(API_URL + "/car/" + carId, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(carToUpdate),
    });
    if (!response.ok)
      return {
        data: null,
        error: { error: true, message: "Bad request / updateCar" },
      };

    return { data: await response.json() };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / updateCar" },
    };
  }
};
