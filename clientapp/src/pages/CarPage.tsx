import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../hooks/useAuth'; 
import Prompt from '../components/primitives/Prompt'; 

const CarPage = () => {

    const { user } = useAuth(); 
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [isSuccess, setIsSuccess] = useState<boolean>(false); 
    const [isError, setIsError] = useState<boolean>(false); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(startDate && endDate){
            console.log(startDate, endDate);
            setIsSuccess(true)
            setTimeout(() => {
                setIsSuccess(false)
            }, 3000); 
        } else {
            setIsError(true); 
            setTimeout(() => {
                setIsError(false)
            }, 3000); 
        }   
    };


    return (
        <div className="page page-car">
            { 
                isSuccess 
                &&
                <Prompt
                    success
                    handleClose={() => setIsSuccess(false)}
                >Pomyślnie zarezewowałeś samochód</Prompt>
            }
            { isError && <Prompt error handleClose={() => setIsError(false)}>Nie udało się dokonać rezerwacji</Prompt>}
            <div className="car car-reservation">
                <img className="car-image car-image--reservation" src="images/corolla.png" alt="car-image" />
                <div className="reservation-controls">
                    <div className="form-wrapper form-wrapper--reservation">
                        <h1 className="form-title form-title--reservation">Zarezerwuj ten samochód!</h1>
                        <form className="form form--reservation" onSubmit={handleSubmit}>
                            <div className="form-group form-group--reservation">
                                <label>Wybierz datę rozpoczęcia:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                    maxDate={new Date(new Date().setDate(new Date().getDate() + 90))} 
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
                            {
                                user 
                                ? 
                                <button className="btn-submit" type="submit">Zarezerwuj</button>
                                : 
                                <button 
                                    className="btn-submit"
                                    onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                                        e.preventDefault() 
                                        navigate('/login')
                                    }}
                                >Zaloguj się przed rezerwacją</button>

                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPage;
