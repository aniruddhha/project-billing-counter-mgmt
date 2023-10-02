import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export async function loader({ params  }: LoaderFunctionArgs) {
    return json({
        blDtls : {
            billNo: `${params.billNo}`,
            mobile:'12344',
            mode: 'card',
            date: '2022-01-01',
            cashier: 'abc',
            counter: 1
        },
        items :[
            {
                item : 'item1',
                price: 555,
                quantity: 80
            },
            {
                item : 'item2',
                price: 123,
                quantity: 23
            },
            {
                item : 'item3',
                price: 789,
                quantity: 1
            }
        ]
    })
}

export default function BillDetails() {
    const { blDtls, items } = useLoaderData<typeof loader>();

    const { billNo, mobile, mode, date, cashier, counter } = blDtls

    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [gst, setGst] = useState<number>(0)

    useEffect(() => {
        const ttl = items.reduce((accumulator, item) => {
            return accumulator + (item.price * item.quantity);
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
                        <span>MOBILE:</span> <Link to={`../customerdetails/${mobile}`}><u>{mobile}</u></Link>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>PAYMENT</span> <span>{mode}</span>
                    </p>
                </div>

                <div className="flex flex-col mr-3 items-end w-[18%]">
                    <p className="flex justify-between w-full">
                        <span>Date: </span><span>{date}</span>
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
                            items.map( ( {item, price, quantity}, sr) => 
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr+1}</td>
                                    <td className="border border-slate-300 text-left"><span className="ml-3">{item}</span></td>
                                    <td className="border border-slate-300 text-center">{price}</td>
                                    <td className="border border-slate-300 text-center">{quantity}</td>
                                    <td className="border border-slate-300 text-center">{ (price*quantity).toFixed(3)}</td>
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