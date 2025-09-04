import express from "express";
import { getUrl, createShortUrl } from "../controller/urlShortner";

const Route = express.Router();

Route.post("/", createShortUrl);
Route.get("/:id", getUrl);

export default Route;
