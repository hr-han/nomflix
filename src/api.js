import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "e557d16cc72c12fc2db13727fff4a3ac",
    language: "en-US"
  }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => api.get(`movie/${id}`, {
        params:{
            append_to_response:"videos"
        }
    }),
    search: (term) => api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    }),
    collection: id => api.get(`collection/${id}`),
};

export const TVApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    tvDetail: id => api.get(`tv/${id}`, {
        params:{
            append_to_response:"videos"
        }
    }),
    search: (term) => api.get("search/tv", {
        params: {
            query: encodeURIComponent(term)
        }
    }),
    season: (id,seasonNum) => api.get(`tv/${id}/season/${seasonNum}`)
};