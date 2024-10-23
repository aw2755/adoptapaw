// Imports dependencies.
import express from "express";
import cors from "cors";
import records from "./routes/record.js";

// Gets the port and initializes an instance of a Express application
const PORT = process.env.PORT || 5050;
const app = express();

// Middleware, used to get requests and perform actions based on request
app.use(cors());
app.use(express.json());
app.use("/record", records);

// starts the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});