import { ICustomer, Customer  } from "./customer-domain";

export interface ICustomerRepository {

    create(cust : ICustomer): Promise<ICustomer>

    update(cust : ICustomer): Promise<ICustomer>

    delete(mobile : string): Promise<ICustomer>

    details(mobile: string): Promise<ICustomer>

    customers(): Promise<Array<ICustomer>>
}

export class CustomerRepository implements ICustomerRepository {
    async create(cust: ICustomer): Promise<ICustomer> {
       const customer = new Customer(cust)
       return customer.save()
    }
    async update(cust: ICustomer): Promise<ICustomer> {
        return Customer.updateOne({ mobile : cust.mobile }, { ...cust}).then( )
    }
    async delete(mobile: string): Promise<ICustomer> {
       return Customer.deleteOne({ mobile }).then()
    }
    async details(mobile: string): Promise<ICustomer> {
        return Customer.findOne({ mobile }).then()
    }

    async customers(): Promise<Array<ICustomer>> {
        return Customer.find({}, {__v: 0})
    }
}