import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { addReview, editReview } from "../../services/ReviewService";
import { useAuth } from "../../hooks/useAuth";
import { Review } from "../../types";

type FormValues = {
  stars: number;
  reviewContent: string;
};

interface ReviewFormProps {
  carId: number;
  modalClose: () => void;
  existingReview: Review | null;
  onReviewSubmit: () => void;
}

export default function ReviewForm({
  carId,
  modalClose,
  existingReview,
  onReviewSubmit,
}: ReviewFormProps) {
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
      if (existingReview) {
        await editReview(
          existingReview.id,
          { starsOutOfFive: stars, reviewContent },
          token as string
        );
      } else {
        await addReview(
          { carId, starsOutOfFive: stars, reviewContent },
          token || ""
        );
      }

      onReviewSubmit();
      modalClose();
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="review-form-title">Zostaw opinię</h1>

      <div className="review-form-group-stars">
        <input
          type="number"
          className="review-form-input"
          step={0.5}
          min={0}
          max={5}
          placeholder="Ile gwiazdek? (1-5)"
          defaultValue={existingReview?.starsOutOfFive}
          {...register("stars", {
            required: {
              value: true,
              message: "Ilość gwiazdek jest wymagana",
            },
          })}
        />

        {errors.stars && (
          <span className="login-input-validate">{errors.stars?.message}</span>
        )}
      </div>

      <div className="login-form-group">
        <input
          type="text"
          className="review-form-input"
          placeholder="Wpisz treść recenzji..."
          defaultValue={existingReview?.reviewContent as string}
          {...register("reviewContent", {
            required: {
              value: true,
              message: "Treść opinii jest wymagana",
            },
          })}
        />

        {errors.reviewContent && (
          <span className="login-input-validate">
            {errors.reviewContent?.message}
          </span>
        )}
      </div>

      {isError && (
        <span className="login-input-validate">Błąd w dodawaniu opinii</span>
      )}
      <button
        className="review-btn-submit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? existingReview
            ? "Edytuję..."
            : "Dodaję..."
          : existingReview
          ? "Edytuj opinię"
          : "Dodaj opinię"}
      </button>
    </form>
  );
}
