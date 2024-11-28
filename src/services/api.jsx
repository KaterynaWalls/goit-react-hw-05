import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


console.log("Base URL:", API_BASE_URL);
console.log("API Token:", API_TOKEN);

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
});

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const { data } = await API.get("/trending/movie/day", {
      params: { page },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
export const searchMovies = async (query, page = 1) => {
  try {
 
    if (!query) {
      console.warn("Query is empty!");
      return { results: [], total_results: 0 }; 
    }


    const { data } = await API.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
    });

   
    return data || { results: [], total_results: 0 };
  } catch (error) {
    
    console.error("Error searching movies:", error.message);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await API.get(`/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const { data } = await API.get(`/movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId, page = 1) => {
  try {
    const { data } = await API.get(`/movie/${movieId}/reviews`, {
      params: {
        language: "en-US",
        page,
      },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export default API;
