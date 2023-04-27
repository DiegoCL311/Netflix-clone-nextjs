import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/server-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { user } = await serverAuth(req);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(400).end();
  }
}
