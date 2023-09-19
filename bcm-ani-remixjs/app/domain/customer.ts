import { Schema, model } from 'mongoose';

interface ICustomer {
    name : string;
    mobile: string;
    email: string;
    dob: Date;
    created: Date;    
    updated: Date;
}

const customerSchema = new Schema<ICustomer>({
    name : { type : String},
    mobile: { type: String, unique: true },
    email: { type: String},
    dob: { type : Date },
    created: { type: Date, default: Date.now },
    updated: { type: Date }
})

export const Customer = model<ICustomer>('Customer', customerSchema)