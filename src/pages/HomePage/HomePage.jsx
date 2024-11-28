import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader"; 
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchTrendingMovies();
       
        setMovies(results);
      } catch (error) {
        setError(error.message || "Failed to fetch trending movies.");
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage errorType="server" />;
  if (!movies.length) return <ErrorMessage errorType="not_found" />;

  return <MovieList movies={movies} />;
};

export default HomePage;
