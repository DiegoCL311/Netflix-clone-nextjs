import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    console.log("-----movieCount", movieCount);

    console.log("-----randomIndex", randomIndex);
    console.log(typeof randomIndex);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    console.log("-----randomMovie", randomMovie);

    res.status(200).json(randomMovie[0]);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
