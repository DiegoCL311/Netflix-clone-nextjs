import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWRImmutable("/api/random", fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useBillboard;
