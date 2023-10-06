import hotelModel from "../model/hotelModel";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

export const hotelReg = async (req: any, res: Response): Promise<Response> => {
  try {
    const { HotelName, Address, Description } = req.body;
    // if(!HotelName || !Email || !Address || !Description){
    //   return res.status(404).json({message:"please fill all fields"})
    // }
    // const checkMail = await hotelModel.findOne({ Email: Email });
    // if (checkMail) {
    //   return res.status(404).json({ message: "email already exist" });
    // }
    // if (!req.file) {
    //   return res
    //     .status(500)
    //     .json({ message: "upload a picture of your hotel" });
    // }
    const regHotel = await hotelModel.create({
      HotelName,
      Address,
      Description,
      // Pictures: req.file.filename,
    });
    return res.status(201).json({
      success: 1,
      message: "registration successful",
      data: regHotel,
    });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
