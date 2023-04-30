import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface WatchProps {}

const Watch: React.FC<WatchProps> = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data, isLoading } = useMovie(movieId as string);
  console.log("data-", data);

  if (isLoading) {
    return <div className="text-white text-3xl">Loading...</div>;
  }

  return (
    <div className=" h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => {
            router.push("/");
          }}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light mr-4">Watching</span>
          {data?.title}
        </p>
      </nav>
      <video autoPlay controls className="w-full h-full object-contain" src={data?.videoUrl}></video>
    </div>
  );
};

export default Watch;
