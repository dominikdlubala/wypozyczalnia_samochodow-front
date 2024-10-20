import { useForm, SubmitHandler } from 'react-hook-form'; 
import { useAuth } from '../hooks/useAuth'; 
import type { User } from '../types'; 

type FormValues = {
    email: string
    username: string 
    password: string
}

export default function RegisterPage() {

    const { login } = useAuth(); 

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = ({ email, username, password }) => {
        // login({ username, password } as Omit<User, 'id'>); 
    }

    return (
        <div className="page register-page d-flex justify-content-center align-items-center">
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
