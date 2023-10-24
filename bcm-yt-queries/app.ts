import { connect, disconnect } from "mongoose";
import { CustomerRepository, ICustomerRepository } from "./customer-repository";

async function customerApi() {
    const repo: ICustomerRepository = new CustomerRepository()

    console.log(await repo.create({ mobile: '98888888', name: 'abc', email:'aa@ww.com', dob: new Date() }))

    console.log(await repo.customers())
}

function billApi() {

}

function analyticsApi() {

}

function userApi() {

}

async function run() {
    await connect('mongodb://127.0.0.1:27017/bcmytdb')
    console.log(`🟢 Connected to Db 🟢`)

    await customerApi()

    await disconnect()
    console.log(`🔴 Disconnected 🔴`)
}

run().catch(err => {
    console.log(`🔴 There is an Error 🔴`)
    console.log(err)
})