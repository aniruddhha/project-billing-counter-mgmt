import { Schema, model} from 'mongoose';

export interface ICustomer {
    name : string;
    mobile: string;
    email: string;
    dob: Date,
}

const customerSchema = new Schema<ICustomer>({
    name: { type: String },
    mobile: { type: String, required:true, unique: true  },
    email: { type: String },
    dob: { type: Date  }
})

export const Customer = model<ICustomer>('Customer', customerSchema)