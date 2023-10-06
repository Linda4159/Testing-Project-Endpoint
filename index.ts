import "./database/databse"
import express, {Application} from "express"
import taskRouter from "./route/taskRoute"
import hotelRouter from "./route/hotelRouter"
import cors from "cors"
import morgan from "morgan"

const app:Application = express()

const port:number = 5555

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",taskRouter)
app.use("/api/v1",hotelRouter)
app.use("/uploads",express.static("uploads"))

const server = app.listen(port,()=>{
    console.log(`port ${port} is listening`)
})
process.on("uncaughtException",(error:any)=>{
    console.log("uncaught exception error")
    process.exit(1)
})
process.on("unhandledRejection",(reason)=>{
    console.log("unhandled error")
    console.log(reason)
    process.exit(1)
})

