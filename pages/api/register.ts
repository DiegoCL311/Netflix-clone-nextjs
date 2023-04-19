import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const user = await prismadb.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "Email in use" });
  }

  const hashedPswrd = await bcrypt.hash(password, 12);

  const newUser = await prismadb.user.create({
    data: {
      email,
      name,
      hashedPassword: hashedPswrd,
      image: "",
      emailVerified: new Date(),
    },
  });

  console.log("1", newUser);

  return res.status(200).json(newUser);
}
