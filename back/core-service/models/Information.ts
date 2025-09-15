import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUserInformation extends Document {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  user_type: string;
  email_address: string;
  username: string;
  phone_number: string;
}

const userInformationSchema = new Schema<IUserInformation>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_type: { type: String, required: true },
  email_address: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  },
  username: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9_-]{3,30}$/,
  },
  phone_number: {
    type: String,
    required: true,
    match: /^\+?[0-9]{8,15}$/,
  },
}, { collection : "UsersInformations", versionKey: false});

export const UserInformation = mongoose.model<IUserInformation>('UsersInformations', userInformationSchema);
