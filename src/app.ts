import express from "express";
import routers from "./routers";

const PORT = process.env.PORT || 8080;
const app = express();

app.use("/", routers());

app.listen(PORT, () => {
  console.log("Server running ", PORT);
});
