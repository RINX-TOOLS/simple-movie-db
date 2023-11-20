import { hello } from "../controllers/hello";
import { Router } from "express";

export default (router: Router) => {
  router.get("/hello", hello);
};
