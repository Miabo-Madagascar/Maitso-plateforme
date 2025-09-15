import mongoose, { Schema, Document, Types } from "mongoose";

interface IToken extends Document {
  userID: Types.ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  _id: Types.ObjectId;
}

const tokenSchema = new Schema<IToken>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "UserInformation",
    required: true
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, { collection : "UsersTokens", versionKey: false });

export const Token = mongoose.model<IToken>("Tokens", tokenSchema);
