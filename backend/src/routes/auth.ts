import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const authRouter = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Register
authRouter.post("/register", async (req:any, res:any) => {
  const { firstname, lastname, username, password } = req.body;  

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) return res.status(400).json({ error: "Username already taken" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { firstname, lastname, username, password: hashedPassword },
  });

  res.status(201).json({ message: "User registered successfully!", user });
});

// Login
authRouter.post("/login", async (req:any, res:any) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token, user: { firstname: user.firstname, lastname: user.lastname, username: user.username } });
});

// Reset Password
authRouter.post("/reset-password", async (req:any, res:any) => {
  const { username, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { username }, data: { password: hashedPassword } });

  res.json({ message: "Password updated successfully!" });
});

export default authRouter;
