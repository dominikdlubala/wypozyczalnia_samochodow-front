import { useForm, SubmitHandler } from 'react-hook-form'; 

type FormValues = {
    username: string 
    password: string
}

export default function LoginPage() {

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = ({ username, password }) => {
        console.log(`Username: ${username} password: ${password}`)
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
                            placeholder="Username"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Username is requried'
                                }
                            })}
                         />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Password"  
                            {...register("password", {
                                required:{
                                    value: true, 
                                    message: 'Password is required'
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
                        {isSubmitting ? 'Submitting...' : 'Log in'}
                    </button>
                </form>
            </div>

        </div>
    )
}