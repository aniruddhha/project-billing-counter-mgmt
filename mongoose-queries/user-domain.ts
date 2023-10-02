import { Schema, model} from 'mongoose';

export interface IUser {
    userName: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    password: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);