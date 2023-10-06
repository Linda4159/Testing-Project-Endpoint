import mongoose from "mongoose";

interface hotel {
  HotelName: string;
  Address: string;
  Pictures: string;
  Description: string;
}
interface iHotel extends hotel, mongoose.Document {}

const hotelSchema = new mongoose.Schema(
  {
    HotelName: {
      type: String,
      require: true,
    },
    Address: {
      type: String,
      require: true,
    },
    pictures: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<iHotel>("hotel", hotelSchema);
