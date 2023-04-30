import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer sm:w-8 sm:h-8 lg:w-24 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
      onClick={() => {
        router.push(`/watch/${movieId}`);
      }}
    >
      <BsFillPlayFill className="" size={24} />
      <p className="invisible w-0 lg:visible lg:w-auto ml-1"> Play </p>
    </button>
  );
};

export default PlayButton;
