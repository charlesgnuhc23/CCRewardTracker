import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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