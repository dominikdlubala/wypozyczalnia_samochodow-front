import { Review } from "../../types";

interface CarReviewProps {
    reviewsData?: Review[] | null; 
}

export default function CarReviews({ reviewsData }: CarReviewProps) {

    return (
        <div className="car-reviews">
            {
                reviewsData
                &&
                reviewsData.map(review => (
                    <div className="review" key={review.id}>
                        <div className="review-header">
                            <div className="review-user">{review.userId}</div>
                            <div className="review-data">{review.dateOfIssue?.toLocaleString()}</div>
                        </div>
                        <div className="review-stars">Gwiazdki: {review.starsOutOfFive}</div>
                        <div className="review-content">{review.reviewContent}</div>
                    </div>
                ))
            }
        </div>
    )
}