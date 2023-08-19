import { Movie, Movies } from "~/types";
import type { H3Event } from "h3";
export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const movieLink = await readBody(event);
  const data: Movies = await $fetch(
    `https://api.themoviedb.org${movieLink}?api_key=c54e012f26022e6ad00735cc83d37781`
  );
  const results = data.results;

  // Fetch all images for each movie
  const moviesWithImages: Movie[] = await Promise.all(
    results.map(async (movie: Movie) => {
      let image;
      let poster;
      if (movie.backdrop_path) {
        image = `${config.imgLink}${movie.backdrop_path}`;
      } else {
        image = "";
      }
      if (movie.poster_path) {
        poster = `${config.imgLink}${movie.poster_path}`;
      } else {
        poster = "";
      }
      return {
        ...movie,
        image,
        poster,
      };
    })
  );
  const moviesWithNonEmptyImages = moviesWithImages.filter(
    (movie) => movie.image !== "" && movie.poster !== ""
  );
  return {
    results: moviesWithNonEmptyImages,
  };
});
