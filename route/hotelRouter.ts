import express,{Router} from "express"
import jwt,{JsonWebTokenError} from "jsonwebtoken"
import { hotelReg, } from "../controller/hotelController"


const router = express.Router()

// router.route("/reg-hotel").post(hotelReg)


export default router
