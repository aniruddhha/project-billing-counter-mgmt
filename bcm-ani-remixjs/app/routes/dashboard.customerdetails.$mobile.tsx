import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { CustomerRepository } from '../repository/customer-repository'
import { BillRepository } from '../repository/bill-repository'
import { ICustomer } from '../domain/customer-domain'

const customerRepository = new CustomerRepository()
const billRepository = new BillRepository()

export async function loader({ params } : LoaderFunctionArgs) {

    const cstDtls = await customerRepository.details(`${params.mobile}`)
    const rcTxns = await billRepository.recent(`${params.mobile}`, 3)

    return json({
        cstDtls, 
        rcTxns
    })
}

export default function CustomerDetails() {

    const { cstDtls, rcTxns } = useLoaderData<typeof loader>();

    const { mobile, name, email, dob }: ICustomer = { ...cstDtls, dob: new Date(cstDtls.dob) }
    

    return (
        <section className="flex flex-col w-full h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> Customer Details </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 w-1/4 h-fit bg-white shadow-lg p-5 mt-3">
                <label >Mobile</label><label className="border-l pl-2">{mobile}</label>
                <label >Name</label><label className="border-l pl-2">{name}</label>
                <label >Email</label><label className="border-l pl-2">{email}</label>
                <label >DOB</label><label className="border-l pl-2">{dob?.toISOString().split('T')[0]}</label>
            </div>

            <div className="mt-3">
                <h5 className="text-gray-400">Recent Transactions</h5>
            </div>

            <div className="mt-3">
                <table className="table-auto border-collapse border border-slate-400 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300">Sr</th>
                            <th className="border border-slate-300 text-left"><span className="ml-3">Bill</span></th>
                            <th className="border border-slate-300 text-center">Date</th>
                            <th className="border border-slate-300 text-center">Amount</th>
                            <th className="border border-slate-300 text-center">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rcTxns.map(({billNo, billDate, amount, mode}, sr) =>
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr+1}</td>
                                    <td className="border border-slate-300 text-left"><Link to={`../billdetails/${billNo}`}><u className="ml-3">{billNo}</u></Link></td>
                                    <td className="border border-slate-300 text-center">{new Date(billDate).toISOString().split('T')[0]}</td>
                                    <td className="border border-slate-300 text-center">{amount}</td>
                                    <td className="border border-slate-300 text-center">{mode}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}