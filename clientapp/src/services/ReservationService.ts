import type {
  AddReservation,
  Reservation,
  ReservationApiReturn,
} from "../types";

const API_URL = "/api/Reservation";

export const getAllReservations = async (): Promise<{
  data: any[] | null;
  error?: { error: boolean; message: string };
}> => {
  try {
    const response = await fetch("/api/Reservation");
    if (!response.ok) {
      return {
        data: null,
        error: { error: true, message: "Failed to fetch reservations" },
      };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / getAllReservations" },
    };
  }
};

export const getUserReservations = async (
  token: string
): Promise<ReservationApiReturn> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      return {
        data: null,
        error: { error: true, message: "Bad request / getUserReservations" },
      };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / getUserReservations" },
    };
  }
};

export const addReservation = async (
  newReservation: AddReservation,
  token: string
): Promise<ReservationApiReturn> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        carId: newReservation.carId,
        startDate: newReservation.startDate,
        endDate: newReservation.endDate,
      }),
    });
    if (!response.ok)
      return {
        data: null,
        error: { error: true, message: "Bad request / addReservation" },
      };

    return { data: await response.json() };
  } catch (error) {
    return {
      data: null,
      error: { error: true, message: "Unexpected error / addReservation" },
    };
  }
};

export const deleteReservation = async (
  id: number,
  token: string
): Promise<ReservationApiReturn> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 204) return { data: null };

    return {
      data: null,
      error: { error: true, message: "Bad request / deleteReservation" },
    };
  } catch (error) {
    return {
      error: { error: true, message: "Unexpected error / deleteReservation" },
    };
  }
};
