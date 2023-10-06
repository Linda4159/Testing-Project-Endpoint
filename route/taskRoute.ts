import express, { Router } from "express";
import jwt from "jsonwebtoken";
import {
    deleteUser,
  getOwners,
  getSingleUser,
  logOut,
  loginOwner,
  regOwner,
  updateUser,
} from "../controller/taskController";

const router = express.Router();

const verifyUser = async (req: any, res: any, next: any) => {
  const sessionGotten = req.headers["cookie"];
  console.log("hand", sessionGotten);
  if (!sessionGotten) {
    return res.status(404).json({ message: "please login to get token" });
  }
  const cookieToken = await sessionGotten.split("=")[1];
  console.log("love", cookieToken);
  if (cookieToken) {
    const tokens = await cookieToken;
    jwt.verify(
      tokens,
      "ivannaorezikomelinda1234567890",
      (err: any, payload: any) => {
        if (err) {
          return res.status(404).json({ message: "token expired" });
        }
        req.user = payload;
        next();
      }
    );
  } else {
    return res.status(404).json({
      message: "invalid token",
    });
  }
};

router.route("/reg-user").post(regOwner);
router.route("/login-user").post(loginOwner);
router.route("/get-all").get(getOwners);
router.route("/single-user/:id").get( getSingleUser);
router.route("/logOut-user").get(logOut);
router.route("/update-user/:id").get(updateUser)
router.route("/delete-account/:id").get(deleteUser)

export default router;
