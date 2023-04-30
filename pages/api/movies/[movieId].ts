import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { user } = await serverAuth(req, res);
    const { movieId } = req.query;

    if (!movieId) {
      throw new Error("Invalid movieId");
    }
    if (typeof movieId !== "string") {
      throw new Error("Invalid movieId");
    }

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
