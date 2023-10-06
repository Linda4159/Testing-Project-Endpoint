import mongoose from "mongoose"

const url :string = "mongodb://0.0.0.0:27017/TaskAuth"

mongoose.connect(url).then(()=>{
    console.log("database is now connected")
}).catch((error)=>{
    console.log("see the error here")
})
export default mongoose