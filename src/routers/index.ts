import { Router } from "express";
import movie from "./movie";

const router = Router();

export default (): Router => {
  movie(router)
  return router;
};
