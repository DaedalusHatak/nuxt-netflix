import { Movie, Movies } from "~/types";
import type { H3Event } from "h3";
export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const movieLink = await readBody(event);

  const data: any = await $fetch(
    `https://api.themoviedb.org/3/genre/${movieLink}/list?api_key=c54e012f26022e6ad00735cc83d37781`
  );
  const results = data.genres;
return results;
  // Fetch all images for each movie

});
