import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import PlaceholderImage from "../../components/PlaceholderImage/PlaceholderImage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movieItem}>
          <Link to={`/movies/${movie.id}`} className={s.movieLink} state={{from: location}}>
            <PlaceholderImage
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null}
              alt={movie.title || movie.name}
              className={s.movieImage}
            />
            <p className={s.movieTitle}>{movie.title || movie.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
