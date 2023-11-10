import { Schema, model } from "mongoose";

export interface IAppUser {
    email: string;
    password: string;
}

const userSchema = new Schema<IAppUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true }
})

export const AppUser = model<IAppUser>('AppUser', userSchema)