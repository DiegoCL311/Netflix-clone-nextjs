import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { user } = await serverAuth(req, res);

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: user?.favoritedIds,
        },
      },
    });

    res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
  }
}
