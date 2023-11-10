import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { IBill } from '~/domain/bill-domain'

import { BillRepository } from '~/repository/bill-repository';
import { CustomerRepository } from '../repository/customer-repository'

const billRepository = new BillRepository()
const customerRepository = new CustomerRepository()

export async function loader( { params } : LoaderFunctionArgs ) {

    const cstDtls = await customerRepository.details(`${params.mobile}`)

    const rcTxns = await billRepository.recent(`${params.mobile}`, 3)
    
    return json({ cstDtls, rcTxns })
}

export default function CustomerDeatils() {
    const { cstDtls, rcTxns  } = useLoaderData<typeof loader>()
    const { mobile, name, dob, email } = cstDtls || {}

    return (
        <section>
            <div className="mt-5 ml-5">
                <h1 className="text-4xl"> Customer Details </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 w-[25%] bg-slate-100 p-3 shadow-lg mt-3 ml-5">
                <label>MOBILE</label><label className="border-l border-slate-400 pl-2">{mobile}</label>
                <label>NAME</label><label className="border-l border-slate-400 pl-2">{name}</label>
                <label>EMAIL</label><label className="border-l border-slate-400 pl-2">{email}</label>
                <label>DOB</label><label className="border-l border-slate-400 pl-2">{dob?.split('T')[0]}</label>
            </div>
            <div className="mt-5 ml-5">
                <label className="text-slate-400">Recent Transactions</label>
            </div>
            <div className='mt-5 ml-5 w-[80%]'>
                <table className='table-fixed w-[100%] shadow-lg bg-white'>
                    <thead>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[30%] text-left'><span className='ml-3'>Bill</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Date</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Amount</span></th>
                            <th className='border border-slate-300'>Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rcTxns.map( ({ billNo, billDate, amount, mode }: IBill, ind) => (
                                <tr className='h-10'>
                                <td className='border border-slate-300 text-center'>{ind + 1}</td>
                                <td className='border border-slate-300 ml-3'><span className='ml-3'>{billNo}</span></td>
                                <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>{billDate?.split('T')[0]}</span></td>
                                <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>{amount}</span></td>
                                <td className='border border-slate-300 text-center'>{mode}</td>
                            </tr>
                            ) )
                        }
                    </tbody>
                </table>
            </div>

        </section>
    )
}