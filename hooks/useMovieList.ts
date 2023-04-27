import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading } = useSWRImmutable("/api/movies", fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useMovieList;
