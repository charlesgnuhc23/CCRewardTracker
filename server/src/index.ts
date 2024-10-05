import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import financialRecordRouter from "./routes/financial-records";

const app: Express = express();
const port = process.env.PORT || 5173;

app.use(express.json());
app.use(cors());

const mongoURI: string = 
    "mongodb+srv://charlesgnuhc:phMLMfzEfhjk2XYJ@rewardtracker.3xpu6.mongodb.net/";

mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log('Server running on port ${port}');
});