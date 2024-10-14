import { useNavigate } from 'react-router-dom'; 

import { useForm, SubmitHandler } from 'react-hook-form'; 
import Gallery, { galleryItems } from '../components/Gallery'; 

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

    const navigate = useNavigate(); 
    
    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = (data) => {    
        var paramsObj = {}; 
        let key: keyof typeof data; 
        for(key in data){
            const value = data[key]
            if(value !== '') {
                paramsObj = { ...paramsObj, [key]: value }
            }
        }
        const query = new URLSearchParams(paramsObj).toString()
        navigate(`/cars?${query}`); 
    }


    return (
        <div className="page page-home">
            <div className="form-wrapper form-wrapper--home">
                <h1 className="form-title">Wybierz co lubisz</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form form-home">
                    <div className="form-home--inputs">
                        <div className="form-group form-group--home">
                            <label>Typ silnika</label>
                            <select 
                                className='form-input form-input--home form-input--select'
                                {...register('engineType')}
                            >
                                <option value="" disabled selected hidden>Typ silnika</option>
                                <option value="gas">Benzyna</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid">Hybryda</option>
                            </select> 
                        </div>
                        <div className="form-group form-group--home">
                            <label>Pojemność</label>
                            <select
                                className='form-input form-input--home form-input--select'
                                {...register('displacement')}
                            >
                                <option value="" disabled selected hidden>Rozmiar silnika</option>
                                <option value="smallEngine">1.0-2.0</option>
                                <option value="mediumEngine">2.0-3.0</option>
                                <option value="bigEngine">3.0+</option>
                            </select>
                        </div>
                        <div className="form-group form-group--home">
                            <label>Nadwozie</label>
                            <select 
                                className='form-input form-input--home form-input--select'
                                {...register('bodyType')}
                            >
                                <option value="" disabled selected hidden>Nadwozie</option>
                                <option value="compact">Kompakt</option>
                                <option value="sedan">Sedan</option>
                                <option value="wagon">Kombi</option>
                                <option value="coupe">Coupe</option>
                            </select>
                        </div>
                        <div className="form-group form-group--home">
                            <label>Kolor</label>
                            <input 
                                type="text" 
                                className='form-input form-input--home'
                                {...register('colour')}
                            />
                        </div>
                        <div className="form-group form-group--home">
                            <label>Cena Min</label>
                            <input 
                                type="text" 
                                className='form-input form-input--home'
                                {...register('priceMin')}
                            />
                        </div>
                        <div className="form-group form-group--home">
                            <label>Cena Max</label>
                            <input 
                                type="text" 
                                className='form-input form-input--home'
                                {...register('priceMax')}
                            />
                        </div>
                        <div className="form-group form-group--home">
                            <label>Rok Min</label>
                            <input 
                                type="text" 
                                className='form-input form-input--home'
                                {...register('yearMin')}
                            />
                        </div>
                        <div className="form-group form-group--home">
                            <label>Rok Max</label>
                            <input 
                                type="text" 
                                className='form-input form-input--home'
                                {...register('yearMax')}
                            />
                        </div>
                    </div>
                    <button 
                        className="btn-submit btn-submit--home"
                        type="submit"
                        disabled={isSubmitting}
                    >Submit</button>
                </form>
            </div>
            <div className="gallery--home">
                <h1 className="gallery-title--home">
                    Najczęściej wybierane
                </h1>
                <Gallery
                    galleryItems={galleryItems.slice(0, 5)}
                />
            </div>
        </div>
    )
}