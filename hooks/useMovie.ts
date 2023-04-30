import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

const useMovie = (id?: string) => {

  const { data, error, isLoading } = useSWRImmutable(id ? `/api/movies/${id}` : null, fetcher);


  return {
    data,
    isLoading,
    error,
  };
};

export default useMovie;
