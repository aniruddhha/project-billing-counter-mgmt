import { Schema, model } from 'mongoose';

export interface IItem {
    itemName: string;
    price: number;
    quantity: number;
}


export interface IBill {
    customerMobile: string;
    billNo: string;
    billDate: Date;
    cashier: string;
    counter: number;
    mode: string
    items: Array<IItem>;
}


const billSchema = new Schema<IBill>({
    customerMobile: { type: String },
    billNo: { type: String, unique: true },
    billDate: { type: Date },
    cashier: { type: String },
    counter: { type: Number },
    mode: { type: String}, 
    items: { type: [{itemName : String, price: Number, quantity: Number}] }
})

export const Bill = model<IBill>('Bill', billSchema)
