import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { IBill } from '~/domain/bill-domain'

import { ActionFunctionArgs, json } from '@remix-run/node'
import { BillRepository } from '~/repository/bill-repository';

const billRepository = new BillRepository()

export async function action( { request } : ActionFunctionArgs) {

    const fd = await request.formData()

    const billNo = String(fd.get('billNo'))
    const customerMobile = String(fd.get('customerMobile'))
    const billDate = String(fd.get('billDate'))
    const counter = Number(fd.get('counter'))
    const cashier = String(fd.get('cashier'))

    const bill: IBill = { billDate, billNo, customerMobile, counter, cashier }

    const bills = await billRepository.searchBills(bill)

    return json(bills)
}

export async function loader() {
    const bills = await billRepository.bills()
    return json(bills)
}

export default function Bills() {

    const bills = useLoaderData<typeof loader>()
    
    const [filter, setFilter] = useState<IBill>({  customerMobile: '', counter: 0  })

    const [filtered, setFiltered] = useState<IBill[]>(bills)

    const [localSearchFilter, setLocalSearchFilter] = useState<IBill>({
        billNo:'',
        customerMobile:'',
        amount: 0,
        billDate:'',
        cashier: '',
        counter: 0
    })

    const onLclIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        console.log(`Name ${name}, Value ${value}`)

        if ((name === 'counter' || name === 'amount' || name === 'customerMobile') && isNaN(Number(value))) return;

        setLocalSearchFilter( old => ({ ...old, [name]: value }))
    }

    const onFltIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if ((name === 'counter' || name === 'customerMobile') && isNaN(Number(value))) return;

        setFilter( old => ({ ...old, [name]: value }))
    }

    const ac = useActionData<typeof action>()

    useEffect( () => {

        const filtered = bills.filter( ( { billNo, customerMobile, amount, billDate, cashier, counter  } : IBill ) => {

            const mobileMatch =  (localSearchFilter.customerMobile && localSearchFilter.customerMobile.trim() !=='') ? customerMobile?.toLocaleLowerCase().includes(localSearchFilter.customerMobile.toLocaleLowerCase()) : true
            const amountMatch = localSearchFilter.amount ? (amount == localSearchFilter.amount) : true
            const billDatematch = localSearchFilter.billDate ? billDate?.includes(localSearchFilter.billDate) : true
            const billNoMatch = (localSearchFilter.billNo && localSearchFilter.billNo.trim() !=='') ? billNo?.toLocaleLowerCase().includes(localSearchFilter.billNo.toLocaleLowerCase()) : true
            const cashierMatch = (localSearchFilter.cashier && localSearchFilter.cashier.trim() !=='') ? cashier?.toLocaleLowerCase().includes(localSearchFilter.cashier.toLocaleLowerCase()) : true
            const countertMatch = localSearchFilter.counter ? (counter == localSearchFilter.counter) : true

            return (mobileMatch && amountMatch && billNoMatch && cashierMatch && countertMatch && billDatematch )
        } )

        setFiltered(filtered)

    }, [localSearchFilter] )

    useEffect(() =>{
        if(ac) setFiltered(ac)
    }, [ac])

    return (
        <section className="container h-[100%]">
            <div className="flex justify-between ml-5 mt-5">
                <h1 className="text-4xl"> Bills </h1>
                <span className='mr-7'>
                    <Link to='../newbill'>
                        <u>New Bill</u>
                    </Link>
                </span>
            </div>
            <fieldset className='bg-slate-100 border w-[60%] h-[25%] mx-5 p-3 shadow-lg mt-5'>
                <legend className='text-[0.8rem]'>Search Filter</legend>
                <Form method='POST' className='grid grid-cols-3 gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="billNo">Bill No</label>
                        <input id="billNo" name="billNo" type="text" className='h-10 p-2' placeholder='Bill No' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="customerMobile">Mobile</label>
                        <input id="customerMobile" name="customerMobile" type="text" className='h-10 p-2' placeholder='Mobile' value={filter.customerMobile} onChange={onFltIpCh} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="billDate">Bill Date</label>
                        <input id="billDate" name="billDate" type="date" className='h-10 p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="counter">Counter</label>
                        <input id="counter" name="counter" type="number" className='h-10 p-2' placeholder='Counter' value={filter.counter} onChange={onFltIpCh} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="cashier">Cashier</label>
                        <input id="cashier" name="cashier" type="text" className='h-10 p-2' placeholder='Cashier' />
                    </div>
                    <div className='flex justify-start items-end'>
                        <input type="submit" value='Search' className='w-20 h-10 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900' />
                    </div>
                </Form>
            </fieldset>

            <div className='mt-8 ml-5 w-[100%] mr-5'>
                <table className='table-fixed shadow-lg bg-white w-[100%]'>
                    <thead>
                        <tr className='h-1'>
                            <th className='border border-slate-300 h-20 w-[2%]'>Sr</th>
                            <th className='border border-slate-300 h-20 w-[5%]'>
                                <input name='billNo' className='bg-slate-200 h-10 w-[80%] p-2' type="text" placeholder='Bill No' onChange={onLclIpCh} value={localSearchFilter.billNo}/>
                            </th>
                            <th className='border border-slate-300 h-20 w-[5%]'>
                                <input name='customerMobile' className='bg-slate-200 h-10  w-[80%] p-2' type="text" placeholder='Mobile' onChange={onLclIpCh} value={localSearchFilter.customerMobile}/>
                            </th>
                            <th className='border border-slate-300 h-20 w-[5%]'>
                                <input name='amount' className='bg-slate-200 h-10  w-[80%] p-2' type="number" placeholder='Amount' onChange={onLclIpCh} value={localSearchFilter.amount}/>
                            </th>
                            <th className='border border-slate-300 h-20 w-[5%]'>
                                <input name='billDate' className='bg-slate-200 h-10  w-[80%] p-2' type="date" onChange={onLclIpCh} value={localSearchFilter.billDate}/>
                            </th>
                            <th className='border border-slate-300 h-20 w-[5%]'>
                                <input name='cashier' className='bg-slate-200 h-10  w-[80%] p-2' type="text" placeholder='Cashier' onChange={onLclIpCh} value={localSearchFilter.cashier}/>
                            </th>
                            <th className='border border-slate-300 h-20 w-[3%]'>
                                <input name='counter' className='bg-slate-200 h-10  w-[80%] p-2' type="number" placeholder='Counter' onChange={onLclIpCh} value={localSearchFilter.counter}/>
                            </th>
                        </tr>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300'>Sr</th>
                            <th className='border border-slate-300 text-left'><span className='ml-3'>Bill No</span></th>
                            <th className='border border-slate-300 text-left ml-3'><span className='ml-3'>Mobile</span></th>
                            <th className='border border-slate-300 text-left ml-3'><span className='ml-3'>Amount</span></th>
                            <th className='border border-slate-300'>Date</th>
                            <th className='border border-slate-300'>Cashier</th>
                            <th className='border border-slate-300'>Counter</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filtered.map( ({ customerMobile, billNo, amount, billDate, cashier, counter } : IBill, ind) => (
                                <tr className='h-10'>
                                    <td className='border border-slate-300 text-center'>{ind + 1}</td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'><Link to={`../billdetails/${billNo}`}><u>{billNo}</u></Link></span></td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'>{customerMobile}</span></td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'>{amount}</span></td>
                                    <td className='border border-slate-300 text-center'>{new Date(billDate || '').toISOString().split('T')[0]}</td>
                                    <td className='border border-slate-300 text-center'>{cashier}</td>
                                    <td className='border border-slate-300 text-center'>{counter}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}