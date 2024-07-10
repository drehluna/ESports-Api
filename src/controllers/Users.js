import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const SECRET_KEY = "lunatest";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existUser) {
    return res.status(409).json({ error: "This email is alredy taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.json(createdUser);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "30m",
  });

  res.json({ token });
};
