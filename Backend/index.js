import express from "express";
import connect from "./database.js";
import cors from "cors";
const app = express();

connect();

app.use(express.json());
app.use(cors());

app.listen(4040);
