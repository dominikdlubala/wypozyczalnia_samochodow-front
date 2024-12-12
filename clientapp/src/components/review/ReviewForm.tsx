import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { addReview } from "../../services/ReviewService";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
  stars: number;
  reviewContent?: string;
};

interface ReviewFormProps {
  carId: number;
  modalClose: () => void;
}

export default function ReviewForm({ carId, modalClose }: ReviewFormProps) {
  const { token } = useAuth();

  const [isError, setIsError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({
    stars,
    reviewContent,
  }) => {
    try {
      const { data, error } = await addReview(
        { carId, starsOutOfFive: stars, reviewContent },
        token || ""
      );

      modalClose();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login-form-title">Zostaw opinię</h1>
      <div className="login-form-group">
        <input
          type="number"
          className="login-form-input review-form-input"
          placeholder="Ile gwiazdek.."
          {...register("stars", {
            required: {
              value: true,
              message: "Ilość gwiazdek jest wymagana",
            },
          })}
        />
      </div>
      <div className="login-form-group">
        <input
          type="text"
          className="login-form-input review-form-input"
          placeholder="Opis.."
          {...register("reviewContent")}
        />
      </div>
      {errors.stars && (
        <span className="login-input-validate">{errors.stars?.message}</span>
      )}
      {isError && (
        <span className="login-input-validate">Błąd w dodawaniu opinii</span>
      )}
      <button
        className="login-btn-submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Dodaję..." : "Dodaj opinię"}
      </button>
    </form>
  );
}
