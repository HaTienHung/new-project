import express from "express";
import cors from "cors";

import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body

app.use(express.json());

//Middlewate for handling cors POLICY

//Option1 : Allow All Origins with Default of cors(*)
app.use(cors());
//Option2 : Allow custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", booksRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello World");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
