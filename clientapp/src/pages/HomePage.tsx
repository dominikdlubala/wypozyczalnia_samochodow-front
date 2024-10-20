import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 

import { getAllCars } from '../services/CarService'; 
import Gallery from '../components/car/Gallery'; 
import type { Car, CarApiReturn } from '../types'; 

interface FormValues {
    engineType?: string | null; 
    displacement?: string | null; 
    bodyType?: string | null; 
    colour?: string | null; 
    priceMin?: string | null; 
    priceMax?: string | null; 
    yearMin?: string | null; 
    yearMax?: string | null; 
}

export default function HomePage() {

    const [cars, setCars] = useState<CarApiReturn>({ data: null }); 
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getAllCars(); 
                setCars(data); 
            } catch (error) {
                console.error(error); 
            }
        }

        fetchCars(); 
    }, []); 

    const {
        register, 
        handleSubmit, 
        formState: { isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = (data) => {    
        var paramsObj = {}; 
        let key: keyof typeof data; 
        for(key in data){
            const value = data[key]
            if(value !== '') {
                paramsObj = { ...paramsObj, [key.slice(0, 1).toUpperCase() + key.slice(1)]: value }
            }
        }
        const query = new URLSearchParams(paramsObj).toString()
        navigate(`/cars?${query}`); 
    }

    return (
        <div className="container-fluid p-0">
            <div className="form-background p-5 d-flex justify-content-center">
                <div className="form-wrapper">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center mb-4">
                            <h1 className="form-title">Wypożyczalnia samochodów</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                        <div className="col-md-3">
                            <label htmlFor="engineType" className="form-label">Typ silnika</label>
                            <select 
                                className='form-select'
                                {...register('engineType')}
                            >
                                <option value="" disabled hidden>Wybierz typ silnika</option>
                                <option value="Petrol">Benzyna</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybryda</option>
                            </select> 
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="displacement" className="form-label">Pojemność</label>
                            <select 
                                className='form-select'
                                {...register('displacement')}
                            >
                                <option value="" disabled hidden>Wybierz pojemność silnika</option>
                                <option value="smallEngine">1.0-2.0</option>
                                <option value="mediumEngine">2.0-3.0</option>
                                <option value="bigEngine">3.0+</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="bodyType" className="form-label">Nadwozie</label>
                            <select 
                                className='form-select'
                                {...register('bodyType')}
                            >
                                <option value="" disabled hidden>Wybierz rodzaj nadwozia</option>
                                <option value="compact">Kompakt</option>
                                <option value="sedan">Sedan</option>
                                <option value="wagon">Kombi</option>
                                <option value="coupe">Coupe</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="colour" className="form-label">Kolor</label>
                            <input 
                                type="text" 
                                className='form-control'
                                {...register('colour')}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="priceMin" className="form-label">Cena minimalna</label>
                            <input 
                                type="text" 
                                className='form-control'
                                {...register('priceMin')}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="priceMax" className="form-label">Cena maksymalna</label>
                            <input 
                                type="text" 
                                className='form-control'
                                {...register('priceMax')}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="yearMin" className="form-label">Rocznik minimalny</label>
                            <input 
                                type="text" 
                                className='form-control'
                                {...register('yearMin')}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="yearMax" className="form-label">Rocznik maksymalny</label>
                            <input 
                                type="text" 
                                className='form-control'
                                {...register('yearMax')}
                            />
                        </div>
                        <div className="col-12 text-center mt-4">
                            <button 
                                className="btn btn-primary btn-submit"
                                type="submit"
                                disabled={isSubmitting}
                            >Wyświetl</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="gallery--home">
                <h1 className="gallery-title--home text-center">
                    Najczęściej wybierane
                </h1>
                {/* <Gallery galleryItems={galleryItems.slice(0, 5)} /> */}
            </div>
        </div>
    )
}
