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
        login({ username, password } as Omit<User, 'id'>); 
    }

    return (
        <div className="page page-login">
            <div className="form-wrapper">
                <form  className="form login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title">Zarejestruj się</h1>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="E-mail"
                            {...register("email", {
                                required: {
                                    value: true, 
                                    message: 'E-mail jest wymagany'
                                }
                            })}
                         />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Nazwa użytkownika"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Nazwa użytkownika jest wymagana'
                                } 
                            })}
                         />
                    </div>
                    {/*  */}
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
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
                        (errors.username || errors.password) && <span className="input-validate">{errors.username?.message || errors.password?.message}</span>
                    }
                    <button 
                        className="btn-submit"
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