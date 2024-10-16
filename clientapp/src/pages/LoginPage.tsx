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

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = async ({ username, password }) => {
        try {
            await login({ username, password }); 
        } catch(error) {
            console.error(error) ;
        }
    }

    return (
        <div className="page page-login">
            <div className="form-wrapper">
                <form  className="form login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title">Log in</h1>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Nazwa użytkownika"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Oba pola są wymagane'
                                }
                            })}
                         />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Hasło"  
                            {...register("password", {
                                required:{
                                    value: true, 
                                    message: 'Oba pola są wymagane'
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
                        {isSubmitting ? 'Loguję...' : 'Zaloguj'}
                    </button>
                </form>
                <div className="login-register">
                    Nie masz konta? 
                    <Link to={'/register'}>Zarejestruj się</Link>
                </div>
            </div>

        </div>
    )
}