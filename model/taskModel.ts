import mongoose from "mongoose";

interface task {
  name: string;
  email: string;
  password: string;
}
interface itask extends task, mongoose.Document {}

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<itask>("task", taskSchema);
