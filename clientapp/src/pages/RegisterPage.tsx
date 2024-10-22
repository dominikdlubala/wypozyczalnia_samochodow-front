import { useState } from 'react'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../hooks/useAuth'; 
import type { User } from '../types'; 
import { registerUser } from '../services/UserService';
import Prompt from '../components/primitives/Prompt'; 

type FormValues = {
    email: string
    username: string 
    password: string
}

export default function RegisterPage() {

    const [formError, setFormError] = useState<{ isError: boolean, message?: string | null}>({ isError: false }); 
    const [formSuccess, setFormSuccess] = useState<{ isSuccess: boolean, message?: string | null}>({ isSuccess: false });

    const navigate = useNavigate(); 
    const { login } = useAuth(); 

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = async ({ email, username, password }) => {
        const { error } = await registerUser({ email, username, password }) 
        if(error) {
            setFormError({ isError: true, message: error.message });
            setTimeout(() => setFormError({ ...formError, isError: false }), 3000);  
        } else {
            setFormSuccess({ isSuccess: true, message: 'User created successfuly' }); 
            setTimeout(() => {
                setFormSuccess({ ...formSuccess, isSuccess: false })
                navigate('/login'); 
            }); 
        }
    }

    return (
        <div className="page register-page d-flex justify-content-center align-items-center">
            { formError.isError && <Prompt error handleClose={() => setFormError({ ...formError, isError: false })} >{formError.message}</Prompt>}
            { formSuccess.isSuccess && <Prompt success handleClose={() => setFormSuccess({ ...formSuccess, isSuccess: false })}>{formSuccess.message}</Prompt>}
            <div className="register-form-wrapper">
                <form  className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="register-form-title">Zarejestruj się</h1>
                    <div className="register-form-group">
                        <input 
                            type="text" 
                            className="register-form-input"
                            placeholder="E-mail"
                            {...register("email", {
                                required: {
                                    value: true, 
                                    message: 'E-mail jest wymagany'
                                }
                            })}
                         />
                    </div>
                    <div className="register-form-group">
                        <input 
                            type="text" 
                            className="register-form-input"
                            placeholder="Nazwa użytkownika"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Nazwa użytkownika jest wymagana'
                                } 
                            })}
                         />
                    </div>
                    <div className="register-form-group">
                        <input 
                            type="password" 
                            className="register-form-input" 
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
                        (errors.username || errors.password || errors.email) && (
                            <span className="register-input-validate">
                                {errors.email?.message || errors.username?.message || errors.password?.message}
                            </span>
                        )
                    }
                    <button 
                        className="register-btn-submit"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Rejestruję...' : 'Zarejestruj'}
                    </button>
                </form>
            </div>
        </div>
    )
}
