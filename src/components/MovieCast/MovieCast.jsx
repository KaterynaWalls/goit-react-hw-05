import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams(); // Отримуємо id фільму з параметрів URL
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return; // Якщо немає movieId, нічого не робимо

    const fetchCast = async () => {
      setLoading(true); // Встановлюємо стан завантаження
      setError(null); // Очищуємо помилки

      try {
        const data = await fetchMovieCast(movieId); // Виконуємо запит до API
        setCast(data || []); // Зберігаємо акторський склад
      } catch (err) {
        console.error("Failed to fetch cast:", err); // Логування помилки
        setError("Failed to fetch cast");
      } finally {
        setLoading(false); // Завантаження завершене
      }
    };

    fetchCast();
  }, [movieId]);

  // Відображення стану завантаження
  if (loading) {
    return <Loader />;
  }

  // Відображення помилки, якщо вона є
  if (error) {
    return <ErrorMessage />;
  }

  // Якщо список акторів порожній
  if (!cast || !Array.isArray(cast) || !cast.length) {
    return <p>No cast information available.</p>;
  }

  return (
    <div className={s.castContainer}>
      <ul className={s.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className={s.actorImage}
            />
            <div className={s.actorInfo}>
              <p className={s.actorName}>{actor.name}</p>
              <p className={s.character}>as {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
