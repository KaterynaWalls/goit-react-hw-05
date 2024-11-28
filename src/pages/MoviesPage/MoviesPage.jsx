import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import s from "./MoviesPages.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;


 const handleSubmit = (value) =>  {
  if(!value) {
    setSearchParams({});
  setMovies([]);
  setError(null);
  setTotalResults(0);
  return;
 }
 
setSearchParams({ query: value, page: 1});
// setError(null);
};

const handlePageChange = (direction) => {
  if (!movies.length) return;

  const newPage =
    direction === "next"
      ? Math.min(page + 1, Math.ceil(totalResults / 20))
      : Math.max(1, page - 1);

  setSearchParams({ query, page: newPage });
};


   useEffect(() => {
    if (!query) {
      // setMovies([]);
      // setTotalResults(0);
      // setError(null); 
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results, total_results } = await searchMovies(query, page);
        setMovies(results);
        setTotalResults(total_results);

        if (results.length === 0) {
          setError("not_found"); 
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("network"); 
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const showNoMoviesMessage = !loading && !error && query && movies.length === 0;

  return (
    <div className={s.container}>
      <h2 className={s.homeText}>Ready for action, drama, or comedy?</h2>
     <SearchBar onSubmit={handleSubmit} />


      {loading && <Loader />}
      {error && !loading && <ErrorMessage errorType={error} />}
      {showNoMoviesMessage && <ErrorMessage errorType="not_found" />}
      {!loading && !error && movies.length > 0 && (
        <>
          <p className={s.resultsText}>
            Found <span>{totalResults}</span> results for{" "}
            <span>{`"${query}"`}</span>
          </p>
          <MovieList movies={movies} />
          <div className={s.pagination}>
  <button
    className={`${s.btnPagination} ${page === 1 ? s.active : ""}`}
    onClick={() => handlePageChange("prev")}
    disabled={page === 1}
  >
    Previous
  </button>
  <span className={s.pageInfo}>Page {page}</span>
  <button
    className={`${s.btnPagination}`}
    onClick={() => handlePageChange("next")}
    disabled={page === Math.ceil(totalResults / 20)}
  >
    Next
  </button>
</div>
        </>
      )}
    </div>
  );
}


export default MoviesPage;
