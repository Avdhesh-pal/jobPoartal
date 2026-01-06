import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import userRoute from './routes/user.routes.js'
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.routes.js"
import path from "path";

dotenv.config({})

const app = express();
 const _dirname = path.resolve();

// middlewares
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"));
app.use(cookieParser());

const corsOption ={
    origin :"http://localhost:5173",
    credentials :true
}
app.use(cors(corsOption));


const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, ()=>{
    connectDB();
    console.log(`server is running at port ${PORT}`);
})