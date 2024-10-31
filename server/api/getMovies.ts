
import type { H3Event } from "h3";
export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const movieLink = getQuery(event);
  const data: ResponseData = await $fetch(
    `https://api.themoviedb.org/${movieLink._}?language=${movieLink.lang}&page=${1}&api_key=${config.apiSecret}`
  );

  const results = data.results;
  // Fetch all images for each movie
  const dataWithImages: (Movie | TVSerie)[] = results.map(
    (data: Movie | TVSerie) => {
      return {
        ...data,
        image: data.backdrop_path
          ? `${config.imgLink}${data.backdrop_path}`
          : "",
        poster: data.poster_path ? `${config.imgLink}${data.poster_path}` : "",
      };
    }
  );
  const dataWithNonEmptyImages = dataWithImages.filter(
    (data) => data.image !== "" && data.poster !== ""
  );
  return {
    results: dataWithNonEmptyImages,
  };
});
