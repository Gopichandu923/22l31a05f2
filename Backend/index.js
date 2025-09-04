import express from "express";
import connect from "./database.js";
import cors from "cors";
import UrlRoute from "./routes/urlShortner.js";

const app = express();

connect();

app.use(express.json());
app.use(cors());

app.use("/urlshortner", UrlRoute);

app.listen(4040);
