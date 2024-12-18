import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { Car, Review } from "../types";
import { useAuth } from "../hooks/useAuth";
import Prompt from "../components/primitives/Prompt";

import { addReservation } from "../services/ReservationService";
import { getCarById } from "../services/CarService";

import { getCarsReviews } from "../services/ReviewService";
import CarReviews from "../components/car/CarReviews";

const CarPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const [carId, setCarId] = useState<number>();
  const [car, setCar] = useState<Car | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    isError: boolean;
    message?: string;
  }>({ isError: false });

  const [isReserving, setIsReserving] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const { data, error } = await getCarById(Number(id));

        const { data: reviewData, error: reviewError } = await getCarsReviews(
          Number(id)
        );
        if (reviewError) {
          setIsError({ isError: true, message: reviewError.message });
        } else {
          setReviews(reviewData as Review[]);
        }

        if (error) {
          setIsError({ isError: true, message: error.message });
        } else {
          setCar(data);
          setCarId(data?.id);
        }
      };
      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car?.pricePerDay) {
      const diffInDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      setTotalPrice(diffInDays * car.pricePerDay);
    } else {
      setTotalPrice(null);
    }
  }, [startDate, endDate, car?.pricePerDay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate && endDate && carId) {
      setIsReserving(true);

      const { error } = await addReservation(
        { carId, startDate, endDate },
        token as string
      );

      if (error) {
        setIsError({ isError: true, message: error.message });
        setIsReserving(false);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/reservations");
        }, 2000);
      }
    } else {
      setIsError({ isError: true, message: "Nie wybrano okresu rezerwacji" });
      setIsReserving(false);
      setTimeout(() => {
        setIsError({ isError: false });
      }, 3000);
    }
  };

  const allDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: Date[] = [];

    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const excludedDates: Date[] = car?.reservations
    ? car.reservations
        .map((r) => allDatesBetween(r.startDate, r.endDate))
        .flat()
    : [];

  return (
    <div className="page page-car">
      {isSuccess && (
        <Prompt success handleClose={() => setIsSuccess(false)}>
          Pomyślnie zarezewowałeś samochód
        </Prompt>
      )}
      {isError.isError && (
        <Prompt error handleClose={() => setIsError({ isError: false })}>
          {isError.message}
        </Prompt>
      )}

      <div className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">
            {car?.brand} {car?.model}
          </h1>
          <div className="banner-info-grid">
            <div className="info-item">
              <span className="info-label">Silnik</span>
              <span className="info-value">{car?.fuelType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Pojemność</span>
              <span className="info-value">{car?.capacity.toFixed(1)} L</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rocznik</span>
              <span className="info-value">{car?.productionYear}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Typ nadwozia</span>
              <span className="info-value">{car?.bodyType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Kolor</span>
              <span className="info-value">{car?.color}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cena za dobę</span>
              <span className="info-value price">{car?.pricePerDay} zł</span>
            </div>
          </div>
        </div>
      </div>

      <div className="car car-reservation">
        <div className="car-content">
          <img
            className="car-image car-image--reservation"
            src={"/images/cars/" + car?.imageUrl}
            alt="car-image"
          />
          <div className="reservation-controls">
            <div className="form-wrapper form-wrapper--reservation">
              <h1 className="form-title form-title--reservation">
                Zarezerwuj!
              </h1>
              <form className="form form--reservation" onSubmit={handleSubmit}>
                <div className="form-group form-group--reservation">
                  <label>Wybierz datę rozpoczęcia:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (endDate && date && date > endDate) {
                        setEndDate(null);
                        setResetMessage(
                          "Data rozpoczęcia nie może być późniejsza niż data zakończenia."
                        );
                        setTimeout(() => setResetMessage(null), 3000);
                      }
                    }}
                    minDate={new Date()}
                    maxDate={
                      new Date(new Date().setDate(new Date().getDate() + 90))
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Wybierz datę"
                    excludeDates={excludedDates}
                  />
                </div>
                <div className="form-group form-group--reservation">
                  <label>Wybierz datę zakończenia:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate ? startDate : new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Wybierz datę"
                    excludeDates={excludedDates}
                  />
                  {resetMessage && (
                    <p style={{ color: "red" }}>{resetMessage}</p>
                  )}
                </div>
                {totalPrice !== null && (
                  <p style={{ color: "black" }}>
                    Łączna cena rezerwacji:{" "}
                    <span className="car-info-span-allCars">
                      {totalPrice} zł
                    </span>
                  </p>
                )}
                {token ? (
                  <button
                    className="btn-submit form-button-submit"
                    type="submit"
                    disabled={isReserving}
                  >
                    {isReserving ? "Rezerwuję..." : "Rezerwuj"}
                  </button>
                ) : (
                  <button
                    className="btn-submit form-button-submit"
                    onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    Zaloguj się przed rezerwacją
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="reviews-title-box">
          <h1 className="reviews-title">RECENZJE</h1>
        </div>

        <div className="car-reviews-section">
          <CarReviews reviewsData={reviews} />
        </div>
      </div>
    </div>
  );
};

export default CarPage;
