import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";

import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <div className={s.castContainer}>
    <ul className={s.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={s.item}>
        <span className={s.actorName}>{actor.name}</span> as{" "}
        <span className={s.character}>{actor.character}</span>
      </li>
    ))}
  </ul>
</div>
  );
};

export default MovieCast;
