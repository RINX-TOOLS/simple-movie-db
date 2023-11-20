import { Router, json } from "express";
import { createMovie } from "../controllers/createMovie.controller";

export default (router: Router) => {
    router.post("/create-movie",
        json(), createMovie);
};
