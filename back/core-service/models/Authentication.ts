import mongoose, { Schema, model, Document, Types } from "mongoose";

interface IUserCredentials extends Document {
  userID: Types.ObjectId;
  hashed_password: string;
}

const userCredentialsSchema = new Schema<IUserCredentials>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "UserInformation",
    required: true,
    unique: true, // one credentials per user
  },
  hashed_password: {
    type: String,
    required: true,
  },
}, { collection : "UsersCredentials", versionKey: false });

export const UserCredentials = mongoose.model<IUserCredentials>("UsersCredentials", userCredentialsSchema);
