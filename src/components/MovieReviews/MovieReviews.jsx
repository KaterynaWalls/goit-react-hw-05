import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return reviews.length === 0 ? (
    <p className={s.noReviews}>No reviews available.</p>
  ) : (
    <div className={s.reviewContainer}>
    <ul className={s.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={s.reviewItem}>
          <h3 className={s.actor}>{review.actor}</h3>
          <p className={s.reviewContent}>{review.content}</p>
        </li>
      ))}
   
   </ul>
   </div>
  );
};

export default MovieReviews;