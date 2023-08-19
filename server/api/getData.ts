import { Movies } from "~/types";
export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig();
  const data: Movies = await $fetch(config.apiLink);
  const results = data.results;

  // Fetch all images for each movie
  const moviesWithImages = await Promise.all(
    results.map(async (movie: any) => {
      const imageLink = `${config.imgLink}${movie.backdrop_path}`;
      const posterLink = `${config.imgLink}${movie.poster_path}`;
      return {
        ...movie,
        imageLink,
        posterLink,
      };
    })
  );

  return {
    results: moviesWithImages,
  };
});
