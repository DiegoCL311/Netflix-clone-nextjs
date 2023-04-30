import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { user } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Movie not found");
      }

      const userUpdate = await prismadb.user.update({
        where: {
          email: user?.email,
        },
        data: {
          favoritedIds: { push: movieId },
        },
      });

      return res.status(200).json(userUpdate);
    } else 
    
    if (req.method === "PUT") {
      const { user } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Movie not found");
      }

      const userUpdate = await prismadb.user.update({
        where: {
          email: user?.email,
        },
        data: {
          favoritedIds: {
            set: without(user?.favoritedIds, movieId),
          },
        },
      });

      return res.status(200).json(userUpdate);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
