import { Review } from "../../types";

interface CarReviewProps {
  reviewsData?: Review[] | null;
}

export default function CarReviews({ reviewsData }: CarReviewProps) {
  // Funkcja obliczająca średnią ocenę
  const calculateAverageRating = (reviews: Review[] | null | undefined) => {
    if (!reviews || reviews.length === 0) return null;
    const totalStars = reviews.reduce((sum, review) => sum + review.starsOutOfFive, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviewsData);

  return (
    <div className="car-reviews">
      {/* Wyświetlanie średniej oceny */}
      {averageRating && (
        <div className="average-rating">
          Średnia ocena ze wszystkich recenzji:{" "}
          <span className="average-rating-value">{averageRating}/5</span>
        </div>
      )}
      {/* Pozostałe recenzje */}
      {reviewsData &&
        reviewsData.map((review) => (
          <div className="review" key={review.id}>
            <div className="review-header">
              <div className="review-user">{review.username}</div>
              <div className="review-data">
                {review.dateOfIssue
                  ? new Date(review.dateOfIssue).toLocaleDateString()
                  : ""}
              </div>
            </div>
            <div className="review-stars">
              Ocena: <span className="review-stars-span">{review.starsOutOfFive}/5</span>
            </div>
            <div className="review-content">{review.reviewContent}</div>
          </div>
        ))}
    </div>
  );
}
