import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { IBill, IItem } from '~/domain/bill-domain'

import { useEffect, useState } from 'react'

import { BillRepository } from '~/repository/bill-repository';

const billRepository = new BillRepository()

export async function loader( { params } : LoaderFunctionArgs ) {

    console.log(params)

    const blDtls: IBill = await billRepository.details(`${params.billNo}`) || {}

    const itms = blDtls.items || []
    
    return json({ blDtls, itms })
}

export default function BillDeatils() {

    const { blDtls, itms  } = useLoaderData<typeof loader>()

    const { billNo, customerMobile, mode, billDate, cashier, counter} = blDtls

    const [total, setTotal] = useState<number>(0)
    const [gst, setGst] = useState<number>(0)

    useEffect(() => {
        const amt = itms.reduce( (acc, it) => {
            return acc + ( ( it.price || 0) * ( it.quantity || 0) )
        }, 0)

        setTotal(amt)

        setGst( (amt*18)/100 )

    }, [itms])

    return (
        <section className="container h-[100%]">
            <div className="ml-5 mt-5">
                <h1 className="text-4xl">Bill Details </h1>
            </div>

            <div className="flex w-[80%] justify-between ml-5 mt-5">
                <div className="flex flex-col w-[20%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Bill #:</span>
                        <span>{billNo}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Mobile:</span>
                        <span>
                            <Link to={`../customerdetails/${customerMobile}`}><u>{customerMobile}</u></Link>
                        </span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Mode:</span>
                        <span>{mode}</span>
                    </div>
                </div>
                <div className="flex flex-col w-[20%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Date:</span>
                        <span>{billDate?.split('T')[0]}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Cashier:</span>
                        <span>{cashier}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Counter:</span>
                        <span>{counter}</span>
                    </div>
                </div>
            </div>
            <hr className="m-5 w-[80%]"/>

            <div className='mt-5 ml-5 w-[80%]'>
                <table className='table-fixed w-[100%] shadow-lg bg-white'>
                    <thead>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[30%] text-left'><span className='ml-3'>Item</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Price</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Quantity</span></th>
                            <th className='border border-slate-300  w-[20%]'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itms.map( ({ itemName, price, quantity }: IItem, ind) => (
                                <tr className='h-10'>
                                    <td className='border border-slate-300 text-center'>{ind + 1}</td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'>{itemName}</span></td>
                                    <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>{price}</span></td>
                                    <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>{quantity}</span></td>
                                    <td className='border border-slate-300 text-center'>{ (price || 0) * (quantity || 0)}</td>
                                </tr>
                            ))
                        }
                       
                      
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>Total</span>
                            </th>
                            <th className='border border-slate-300'>
                                {total}
                            </th>
                        </tr>
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>GST</span>
                            </th>
                            <th className='border border-slate-300'>
                                {gst}
                            </th>
                        </tr>
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>Grand Total</span>
                            </th>
                            <th className='border border-slate-300'>
                                { total + gst }
                            </th>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}