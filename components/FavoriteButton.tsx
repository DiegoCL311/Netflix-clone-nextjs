import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentuser";
import useFavorite from "@/hooks/useFavorites";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

  const { mutate: mutateFavorites } = useFavorite();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    if (!currentUser) return false;
    return currentUser?.favoritedIds.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.put("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", {
        movieId,
      });
    }

    const updatedFavoritedIds = response?.data?.favoritedIds;

    mutate({
      ...currentUser,
      favoritedIds: updatedFavoritedIds,
    });

    mutateFavorites();
  }, [currentUser, movieId, mutate, mutateFavorites, isFavorite, axios]);

  const Icon = isFavorite ? AiOutlineCheck : MdOutlineFavoriteBorder;

  return (
    <div
      onClick={toggleFavorite}
      className=" bg-white cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center transition hover:border-neutral-500"
    >
      <Icon size={15} />
    </div>
  );
};

export default FavoriteButton;
