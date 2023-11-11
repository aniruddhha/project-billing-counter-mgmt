import { connect, disconnect } from "mongoose";
import { CustomerRepository, ICustomerRepository } from "./customer-repository";
import { BillRepository, IBillRepository } from "./bill-repository";
import { ICustomer } from "./customer-domain";
import { AppUserRepository, IUserRepository } from "./user-repository";
import { totalMonthlySell, totalProductSell } from "./analytics-repository";

async function customerApi() {
    const repo: ICustomerRepository = new CustomerRepository()

    // console.log(await repo.create({ mobile: '98888888', name: 'abc', email:'aa@ww.com', dob: new Date() }))
    // console.log(await repo.create({ mobile: '98888889', name: 'ert', email:'ert@yy.com', dob: new Date() }))

    // console.log(await repo.customers())

    // const cust = await repo.details('98888888')
    // if(cust)
    //     await repo.edit({ ...cust, name: 'www', email : 'ww@rr.tom' })

    console.log(await repo.customers())

    // console.log(await repo.delete('98888888'))
}

async function billApi() {
    const repo: IBillRepository = new BillRepository()

    // console.log(await repo.newBill({
    //     "customerMobile": "1234567890",
    //     "billNo": "BILL003",
    //     "amount": 100.00,
    //     "billDate": "2000-01-01",
    //     "cashier": "John Doe",
    //     "counter": 1,
    //     "mode": "Cash",
    //     "items": [
    //         {
    //             "itemName": "Item A",
    //             "price": 10.00,
    //             "quantity": 2
    //         },
    //         {
    //             "itemName": "Item B",
    //             "price": 5.00,
    //             "quantity": 3
    //         }
    //     ]
    // }))

    // console.log(await repo.newBill({
    //     "customerMobile": "2345678901",
    //     "billNo": "BILL002",
    //     "amount": 75.50,
    //     "billDate": "2023-10-15",
    //     "cashier": "Jane Smith",
    //     "counter": 2,
    //     "mode": "Credit Card",
    //     "items": [
    //         {
    //             "itemName": "Item C",
    //             "price": 15.50,
    //             "quantity": 2
    //         },
    //         {
    //             "itemName": "Item D",
    //             "price": 20.00,
    //             "quantity": 2
    //         }
    //     ]
    // }))

    // console.log(await repo.bills()) 

    // console.log(await repo.searchBills({ billNo: '0001', billDate:new Date().toISOString(), cashier:'Jane Smith' }))
    // console.log(await repo.details('BILL001'))
    console.log(await repo.recent('1234567890',3))
}

async function analyticsApi() {
    // totalMonthlySell()

    totalProductSell()
}

async function userApi() {

    const repo : IUserRepository = new AppUserRepository()
    // await repo.createUser({ email :'abc@gg.com', password: 'abc'  })
    const obj = await repo.login({ email :'abc@gg.com', password: 'abc' })
    if(obj == null) console.log(`User Not Found`)
    else console.log('Login Success')
}

async function run() {
    await connect('mongodb://127.0.0.1:27017/bcmytdb')
    console.log(`🟢 Connected to Db 🟢`)

    // await customerApi()

    // await billApi()

    // await userApi()

    await analyticsApi()

    // await disconnect()
    // console.log(`🔴 Disconnected 🔴`)
}

run().catch(err => {
    console.log(`🔴 There is an Error 🔴`)
    console.log(err)
})