import { Router } from "express";
import hello from "./hello";
import createMovie from "./createMovie.router";

const router = Router();

export default (): Router => {
  createMovie(router)
  hello(router);
  return router;
};
