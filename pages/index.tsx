import Billboard from "@/components/Billboard";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentuser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favMovies = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending now" />
        <MovieList data={favMovies} title="My favorites" />
      </div>
    </>
  );
}
