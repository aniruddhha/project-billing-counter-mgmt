// creating customer
// edit customer
// delete customer
// customer details for mobile
// list all customers

import { Customer, ICustomer } from "./customer-domain";

export interface ICustomerRepository {

    create(cust: ICustomer): Promise<ICustomer>

    edit(cust: ICustomer): Promise<ICustomer>

    delete(mobile: string): Promise<number>

    details(mobile: string): Promise<ICustomer|undefined>

    customers(): Promise<Array<ICustomer>>
}

export class CustomerRepository implements ICustomerRepository {

    async create(cust: ICustomer): Promise<ICustomer> {
       const cst = new Customer(cust)
       return cst.save()
    }
    async edit(cust: ICustomer): Promise<ICustomer> {
        return await Customer.findOneAndUpdate({ mobile: cust.mobile }, { $set: { ...cust } }).then()
    }

    async details(mobile: string): Promise<ICustomer|undefined> {
        return Customer.findOne({ mobile }, { __v : 0}).then(cst => cst?.toObject())  
    }

    async delete(mobile: string): Promise<number> {
       return Customer.deleteOne({ mobile }).then( cst => cst.deletedCount )
    }
   
    async customers(): Promise<ICustomer[]> {
        return Customer.find({}, { __v: 0 })
    }
}