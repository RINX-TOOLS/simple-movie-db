import { Router, json } from "express";
import createMovie from "../controllers/create-movie";

export default (router: Router) => {
    router.post("/movie/create",
        json(), createMovie);
};
