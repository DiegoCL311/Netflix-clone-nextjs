import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable("/api/favorites", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useFavorites;
