import { Request, Response } from "express";

export const hello = async (req: Request, res: Response) => {
  res.json({ msg: "Hello!" });
};
