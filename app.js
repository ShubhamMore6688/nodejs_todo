import exprees from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
const app = exprees();
//middleware for accepting json data from post request
app.use(exprees.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTED_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
config({
    path: "./data/config.env"
});

connectDB();

//using error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});