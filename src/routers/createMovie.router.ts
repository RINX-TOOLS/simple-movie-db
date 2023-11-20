import { Router, urlencoded } from "express";
import { createMovie } from "../controllers/createMovie.controller";

const encoded = urlencoded({ extended: true })

export default (router: Router) => {
    router.post("/create-movie",
        encoded, createMovie);
};
