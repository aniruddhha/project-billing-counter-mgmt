import { connect, disconnect } from 'mongoose';

import { IUserRepository, UserRepository } from './user-repository'
import { CustomerRepository, ICustomerRepository } from './customer-repository';
import { BillRepository, IBillRepository } from './bill-repository'


async function userApi() {
    const repo: IUserRepository = new UserRepository()
    console.log(await repo.createUser({ userName: 'aaa', password: 'aaa' }))
    console.log(await repo.login({ userName: 'aaa', password: 'aaa' }))
}

async function cunstomerApi() {
    const custRepo: ICustomerRepository = new CustomerRepository()
    try {
        await custRepo.create({ name: 'aaa', email: 'aaa@dd.com', dob: new Date(), mobile: '12345' })

        console.log(await custRepo.details('12345'));

        console.log(await custRepo.customers())

        await custRepo.update({ mobile: '12345', name: 'zzzz', dob: new Date('2000-01-01'), email: 'zz@zz.com' })

        custRepo.delete('12345')

        console.log(await custRepo.details('12345'));

    } catch (err) {
        console.log(err)
    }
}

async function billsApi() {
    const repo: IBillRepository = new BillRepository()

    await repo.newBill({
        billNo: 'BILL001',
        customerMobile: '1234567890',
        billDate: new Date('2023-10-10'),
        cashier: 'John Doe',
        counter: 1,
        mode:'upi',
        items: [
            { itemName: 'Item 1', price: 10.0, quantity: 2 },
            { itemName: 'Item 2', price: 15.0, quantity: 1 },
        ],
    });
    

    // await repo.newBill({
    //     billNo: 'BILL002',
    //     customerMobile: '9876543210',
    //     billDate: new Date('2023-10-11'),
    //     cashier: 'Jane Smith',
    //     counter: 2,
    //     items: [
    //         { itemName: 'Item 3', price: 12.5, quantity: 3 },
    //         { itemName: 'Item 4', price: 8.0, quantity: 5 },
    //     ],
    // });

    // await repo.newBill({
    //     billNo: 'BILL003',
    //     customerMobile: '5555555555',
    //     billDate: new Date('2023-10-12'),
    //     cashier: 'Alice Johnson',
    //     counter: 3,
    //     items: [
    //         { itemName: 'Item 5', price: 20.0, quantity: 2 },
    //         { itemName: 'Item 6', price: 10.0, quantity: 4 },
    //     ],
    // });

    // await repo.newBill({
    //     billNo: 'BILL004',
    //     customerMobile: '9999999999',
    //     billDate: new Date('2023-10-13'),
    //     cashier: 'Bob Wilson',
    //     counter: 4,
    //     items: [
    //         { itemName: 'Item 7', price: 5.0, quantity: 10 },
    //         { itemName: 'Item 8', price: 18.0, quantity: 3 },
    //     ],
    // });

    // await repo.newBill({
    //     billNo: 'BILL005',
    //     customerMobile: '7777777777',
    //     billDate: new Date('2023-10-14'),
    //     cashier: 'Eve Davis',
    //     counter: 5,
    //     items: [
    //         { itemName: 'Item 9', price: 7.5, quantity: 6 },
    //         { itemName: 'Item 10', price: 25.0, quantity: 2 },
    //     ],
    // });

    // console.log(await repo.bills())

    // console.log(await repo.searchBills({ customerMobile: '7777777777', billNo:'BILL001' }))

    console.log(await repo.details('BILL001'))
}

async function run() {
    await connect('mongodb://127.0.0.1:27017/bcmdb');
    console.log(`🟢 Connected`)

    console.log(await billsApi())

    await disconnect()
    console.log(`🔴 Disconnected`)
}

run().catch(err => {
    console.log(`🔴 Got the error 🔴`)
    console.log(err)
})

