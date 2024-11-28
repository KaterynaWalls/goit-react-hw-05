import { Routes, Route, useLocation} from "react-router-dom";
import { lazy, Suspense } from "react";

import Navigation from "./components/Navigation/Navigation";
import s from "./App.module.css";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(
  () => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews'));
const App = () => {
  const location = useLocation();

  const isMoviesPage = location.pathname === "/movies";
  const isHomePage = location.pathname === "/";
 
  return (
    <div className={`${s.pageContainer} ${
      isMoviesPage 
        ? s.moviesBackground 
        : isHomePage 
        ? s.homeBackground 
        : s.defaultBackground
    }`}>
        <Navigation />
        <div className={s.innerContainer}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
    </div>
    </div>
  );
};
export default App;
