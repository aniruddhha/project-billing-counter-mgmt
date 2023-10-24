// creating customer
// edit customer
// delete customer
// customer details for mobile
// list all customers

import { Customer, ICustomer } from "./customer-domain";

export interface ICustomerRepository {

    create(cust: ICustomer): Promise<ICustomer>

    edit(cust: ICustomer): Promise<ICustomer>

    delete(mobile: string): Promise<ICustomer>

    details(mobile: string): Promise<ICustomer>

    customers(): Promise<Array<ICustomer>>
}

export class CustomerRepository implements ICustomerRepository {

    async create(cust: ICustomer): Promise<ICustomer> {
       const cst = new Customer(cust)
       return cst.save()
    }
    async edit(cust: ICustomer): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }
    async delete(mobile: string): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }
    async details(mobile: string): Promise<ICustomer> {
        throw new Error("Method not implemented.");
    }
    async customers(): Promise<ICustomer[]> {
        return Customer.find({}, { __v: 0 })
    }
}