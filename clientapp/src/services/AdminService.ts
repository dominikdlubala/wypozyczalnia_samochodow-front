import { Car, CarApiReturn, User } from "../types";

const API_URL = "/api/admin";

// USER

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch(API_URL + "/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// CAR

export const uploadImage = async (
  file: File,
  token: string
): Promise<{ uniqueFileName: string }> => {
  const formData = new FormData();
  formData.append("imageFile", file);

  const response = await fetch(API_URL + "/uploadImage", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData, // FormData automatycznie ustawi odpowiedni Content-Type
  });

  const result = await response.json();
  return result;
};

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

export const deleteCar = async (
  carId: number,
  token: string
): Promise<CarApiReturn> => {
  try {
    const response = await fetch(API_URL + "/car/" + carId, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok)
      return {
        data: null,
        error: { error: true, message: "Bad request / deleteCar" },
      };

    return { data: await response.json() };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / deleteCar" },
    };
  }
};
