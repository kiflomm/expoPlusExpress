import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const usersRouter = express.Router();

// get user by username
usersRouter.get("/:username", async (req:any, res:any) => {
    const { username } = req.params;
    const user = await prisma.user.findUnique({ where: { username } });
    res.json(user);
  });

// get user by id
usersRouter.get("/:id", async (req:any, res:any) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    res.json(user);
  });
export default usersRouter;