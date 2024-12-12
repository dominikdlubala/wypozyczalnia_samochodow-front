import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { addFault } from "../../services/FaultService";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
    description: string;
};

interface FaultFormProps {
    carId: number;
    modalClose: () => void;
}

export default function FaultForm({ carId, modalClose }: FaultFormProps) {
    const { token } = useAuth(); 

    const [isError, setIsError] = useState<boolean>(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async ({ description }) => {
        try {
            await addFault({ carId, description }, token || ""); 
            modalClose(); 
        } catch (error) {
            setIsError(true);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="login-form-title">Zgłoś usterkę</h1>
            <div className="login-form-group">
                <textarea
                    className="login-form-input fault-form-input"
                    placeholder="Opis usterki.."
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Opis usterki jest wymagany"
                        }
                    })}
                />
            </div>
            {errors.description && <span className="login-input-validate">{errors.description?.message}</span>}
            {isError && <span className="login-input-validate">Błąd podczas zgłaszania usterki</span>}
            <button 
                className="login-btn-submit"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Zgłaszanie..." : "Zgłoś usterkę"}
            </button>
        </form>
    );
}
