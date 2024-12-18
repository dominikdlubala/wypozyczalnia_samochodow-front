import { Review } from "../../types";

interface CarReviewProps {
  reviewsData?: Review[] | null;
}

export default function CarReviews({ reviewsData }: CarReviewProps) {
  return (
    <div className="car-reviews">
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
