import { useState } from 'react'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { Link } from 'react-router-dom'; 

import { useAuth } from '../hooks/useAuth'; 
import type { User } from '../types'; 

type FormValues = {
    username: string 
    password: string
}

export default function LoginPage() {

    const { login } = useAuth(); 
    const [isError, setIsError] = useState<boolean>(false); 

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = async ({ username, password }) => {
        try {
            const { error } = await login({ username, password }); 

            if(error){
                setIsError(true); 
            }

        } catch(error) {
            setIsError(true); 
        }
    }

    return (
        <div className="page login-page d-flex justify-content-center align-items-center">
            <div className="login-form-wrapper">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="login-form-title">Zaloguj się</h1>
                    <div className="login-form-group">
                        <input 
                            type="text" 
                            className="login-form-input"
                            placeholder="Nazwa użytkownika"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Nazwa użytkownika jest wymagana'
                                }
                            })}
                        />
                    </div>
                    <div className="login-form-group">
                        <input 
                            type="password" 
                            className="login-form-input" 
                            placeholder="Hasło"  
                            {...register("password", {
                                required:{
                                    value: true, 
                                    message: 'Hasło jest wymagane'
                                }
                            })}
                        />
                    </div>
                    {
                        (errors.username || errors.password) && <span className="login-input-validate">{errors.username?.message || errors.password?.message}</span>
                    }
                    {
                        isError && <span className="login-input-validate">Użytkownik nie istnieje</span>
                    }
                    <button 
                        className="login-btn-submit"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Loguję...' : 'Zaloguj'}
                    </button>
                </form>
                <div className="login-register-link mt-2">
                    <span>Nie masz konta?</span> <br/>
                    <Link to={'/register'}>Zarejestruj się</Link>
                </div>
            </div>
        </div>
    )
}
