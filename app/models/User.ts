import mongoose, { Schema, Document } from "mongoose";

export interface ITopics extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  emailVerified: string;
  // accounts: any,
  // sessions: any,
  timeStamp: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: String },
  timeStamp: { type: Date, default: Date.now },
});

const User =
  mongoose.models.User || mongoose.model<ITopics>("User", UserSchema);

export default User;
