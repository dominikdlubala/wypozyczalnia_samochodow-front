import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { Reservation, Car, Review } from "../types";
import { useAuth } from "../hooks/useAuth";
import Prompt from "../components/primitives/Prompt";

import { addReservation } from "../services/ReservationService";
import { getCarById } from "../services/CarService";

import { getCarsReviews, getAllReviews } from '../services/ReviewService'; 
import CarReviews from "../components/car/CarReviews";


const CarPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [carId, setCarId] = useState<number>();

  const [car, setCar] = useState<Car | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    isError: boolean;
    message?: string;
  }>({ isError: false });

  const [reviews, setReviews] = useState<Review[] | null>(null); 

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const { data, error } = await getCarById(Number(id));

        const { data: reviewData, error: reviewError } = await getCarsReviews(Number(id));  
        if(reviewError) {
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate && endDate) {
      const { error } = await addReservation(
        { carId, startDate, endDate } as Omit<Reservation, "id" & "userId">,
        token as string
      );

      if (error) {
        setIsError({ isError: true, message: error.message });
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/reservations");
        }, 3000);
      }
    } else {
      setIsError({ isError: true, message: "Nie wybrano okresu rezerwacji" });
      setTimeout(() => {
        setIsError({ isError: false });
      }, 3000);
    }
  };

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
      <div className="car car-reservation">
        <img
          className="car-image car-image--reservation"
          src={"/images/cars/" + car?.imageUrl}
          alt="car-image"
        />
        <div className="reservation-controls">
          <div className="form-wrapper form-wrapper--reservation">
            <h1 className="form-title form-title--reservation">
              Zarezerwuj ten samochód!
            </h1>
            <form className="form form--reservation" onSubmit={handleSubmit}>
              <div className="form-group form-group--reservation">
                <label>Wybierz datę rozpoczęcia:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 90))
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Wybierz datę"
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
                />
              </div>
              {token ? (
                <button className="btn-submit form-button-submit" type="submit">
                  Zarezerwuj
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
      
      <CarReviews reviewsData={reviews} />
    </div>
  );
};

export default CarPage;
