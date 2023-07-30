import { Movies } from "../../types";
export default defineEventHandler(async (event: any) => {
  const movieLink = await readBody(event);
  const data: Movies = await $fetch(
    `https://api.themoviedb.org${movieLink}?api_key=c54e012f26022e6ad00735cc83d37781`
  );
  const results = data.results;

  // Fetch all images for each movie
  const moviesWithImages = await Promise.all(
    results.map(async (movie: any) => {
      let image;
      let poster;
      if (movie.backdrop_path) {
        image = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      } else {
        image = "";
      }
      if (movie.poster_path) {
        poster = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
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
