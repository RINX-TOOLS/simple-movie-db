import express from "express";
import type { Request, Response } from "express";
import routers from "./routers";
import 'dotenv/config'

const PORT = process.env.PORT || 8080;
const app = express();

app.use("/", routers());

app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).end()
})

app.listen(PORT, () => {
  console.log("Server running ", PORT);
});
