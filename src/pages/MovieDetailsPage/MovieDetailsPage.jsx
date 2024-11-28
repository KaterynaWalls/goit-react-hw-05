import {  NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import { Suspense, useEffect, useState, useRef} from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PlaceholderImage from "../../components/PlaceholderImage/PlaceholderImage";
import s from "./MovieDetailsPage.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");
  const { movieId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(movieId);
        setItem(data);
      } catch (error) {
        setError(error.message || "Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage errorType="server" />;
  if (!item) return <ErrorMessage errorType="not_found" />;

  return (
    <div className={s.container}>
      <article className={s.movieDetails}>
        <div className={s.header}>
          {/* Back Button */}
          <NavLink to={backLink.current} className={s.btnGoBack}>
            ⬅ Go Back
          </NavLink>
          <h1 className={s.title}>{item.title || "No title available"}</h1>
        </div>
        {/* Movie Image */}
        {item.backdrop_path ? (
          <img
            src={`${IMAGE_BASE_URL}${item.backdrop_path}`}
            alt={item.title || "Movie image"}
            className={s.img}
          />
        ) : (
          <PlaceholderImage className={s.img} />
        )}
        <p className={s.text}>{item.overview || "No overview available."}</p>
        <div className={s.detailsBox}>
          {/* Additional Information */}
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? s.active : s.btn)}
            state={location.state}
          >
            Reviews
          </NavLink>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? s.active : s.btn)}
            state={location.state}
          >
            Cast
          </NavLink>
          {item.homepage && (
            <a
              href={item.homepage}
              className={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Home Page
            </a>
          )}
          {item.release_date && (
            <p className={s.info}>
              Release date:&nbsp;<span>{item.release_date}</span>
            </p>
          )}
          {item.popularity && (
            <p className={s.info}>
              Popularity:&nbsp;<span>{item.popularity}</span>
            </p>
          )}
        </div>
      </article>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
