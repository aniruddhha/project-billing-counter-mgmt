import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { IBill, IItem } from "~/domain/bill-domain";
import { BillRepository } from '../repository/bill-repository'

const billRepository = new BillRepository()

export async function loader({ params  }: LoaderFunctionArgs) {

    const blDtls: IBill = await billRepository.details(`${params.billNo}`)
    const items: Array<IItem> = blDtls.items

    return json({
        blDtls,
        items 
    })
}

export default function BillDetails() {
    const { blDtls, items } = useLoaderData<typeof loader>();

    const { billNo, customerMobile, mode,billDate, cashier, counter } = blDtls

    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [gst, setGst] = useState<number>(0)

    useEffect(() => {
        const ttl = items.reduce((accumulator, item) => {
            return accumulator +  ( (item.price ? item.price : 0) * (item.quantity ? item.quantity : 0));
        }, 0)
        setTotalAmount(ttl)

        setGst((ttl * 18) / 100)

    }, [items])

    return (
        
        <section className="container flex flex-col w-screen h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> Bill Details </h1>
            </div>

            <div className="flex justify-between items-end w-[80%] h-[12%] bg-white shadow-lg mt-5 p-3">

                <div className="flex flex-col items-end w-[18%]">
                    <p className="flex justify-between w-full">
                        <span>BILL #: </span><span>{billNo}</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>MOBILE:</span> <Link to={`../customerdetails/${customerMobile}`}><u>{customerMobile}</u></Link>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>PAYMENT</span> <span>{mode}</span>
                    </p>
                </div>

                <div className="flex flex-col mr-3 items-end w-[18%]">
                    <p className="flex justify-between w-full">
                        <span>Date: </span><span>{new Date(billDate).toISOString().split('T')[0]}</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>Cashier:</span> <span>{cashier}</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>Counter:</span> <span>{counter}</span>
                    </p>
                </div>
            </div>
                          
            <div className="w-[100%] mt-5">
                <table className="table-fixed border-collapse border border-slate-300 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className=" bg-slate-100 h-10">
                            <th className="w-[5%] border border-slate-300">Sr</th>
                            <th className="w-[20%] border border-slate-300 text-left"><span className="ml-3">Item</span></th>
                            <th className="w-[15%] border border-slate-300 text-center">Price</th>
                            <th className="w-[15%] border border-slate-300 text-center">Quantity</th>
                            <th className="w-[15%] border border-slate-300 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map( ( {itemName, price, quantity}, sr) => 
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr+1}</td>
                                    <td className="border border-slate-300 text-left"><span className="ml-3">{itemName}</span></td>
                                    <td className="border border-slate-300 text-center">{price ? price : ''}</td>
                                    <td className="border border-slate-300 text-center">{quantity ? quantity : ''}</td>
                                    <td className="border border-slate-300 text-center">{ (price && quantity) && (price*quantity).toFixed(3)}</td>
                                </tr>
                            )
                        }
                        
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">Total</span>
                            </th>
                            <th className="border border-slate-300 text-center " >{totalAmount.toFixed(3)}</th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">GST</span>
                            </th>
                            <th className="border border-slate-300 text-center" >{gst.toFixed(3)}</th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">Grand Total</span>
                            </th>
                            <th className="border border-slate-300 text-center" >{(totalAmount+gst).toFixed(3)}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}