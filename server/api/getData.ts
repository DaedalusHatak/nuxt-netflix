import { Movies } from "../../types";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const data: Movies = await $fetch(config.apiLink);
  const results = data.results;

  // Fetch all images for each movie
  const moviesWithImages = await Promise.all(
    results.map(async (movie: any) => {
      const imageLink = `${config.imgLink}${movie.backdrop_path}`;

      return {
        ...movie,
        imageLink,
      };
    })
  );

  return {
    results: moviesWithImages,
  };
});
