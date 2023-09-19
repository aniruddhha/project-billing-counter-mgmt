import { Link } from "@remix-run/react";
import { newBill } from "../icons"


export default function Bills() {
    return (
        <section className="container h-screen w-screen">

            <div className="flex justify-between items-center w-[80%] mt-5">
                <h1 className="text-3xl mx-3 w-[20%]"> Bills </h1>

                <Link className="flex justify-center items-center rounded-full border bg-lime-600 p-2 text-white" to={'../newbill'}>
                    <span>{newBill}</span>
                    <span className="px-2">New Bill</span>
                </Link>
            </div>

            <fieldset className="border border-gray-300 p-8 w-[60%] bg-white shadow-lg mt-5">
                <legend className="text-1xl">Search Filter</legend>
                <div className="grid grid-cols-3 gap-5 h-[10%] ">
                    <div className="h-15 flex flex-col">
                        <label htmlFor="mobile">Mobile</label>
                        <input id="mobile" type="text" className="h-10 p-2 bg-slate-200" placeholder="Mobile" />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="billNo">Bill No</label>
                        <input id="billNo" type="text" className="h-10 p-2 bg-slate-200" placeholder="Bill Number" />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="billDate">Bill Date</label>
                        <input id="billDate" type="date" className="h-10 p-2 bg-slate-200" placeholder="Date" />
                    </div>

                    <div className="h-15 flex flex-col">
                        <label htmlFor="counter">Bill Date</label>
                        <input id="counter" type="text" className="h-10 p-2 bg-slate-200" placeholder="Counter" />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="cashier">Bill Date</label>
                        <input id="cashier" type="text" className="h-10 p-2 bg-slate-200" placeholder="Cashier" />
                    </div>
                    <div className="h-15 flex items-end">
                        <input type="button" value="Search" className="border bg-blue-500 w-20 h-10 text-white" />
                    </div>
                </div>
            </fieldset>

            <div className="mt-5">
                <table className="table-fixed border-collapse border border-slate-400 w-[90%] bg-white shadow-lg">
                    <thead>
                        <tr className="h-20">
                            <th className="border border-slate-300 w-[3%]"></th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Bill Number" />
                            </th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Mobile" />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Amount" />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Date" />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Counter" />
                            </th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" className="w-[80%] h-10 p-2 border" placeholder="Cashier" />
                            </th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300">Sr</th>
                            <th className="border border-slate-300 text-left">Bill Number</th>
                            <th className="border border-slate-300 text-left ">Mobile</th>
                            <th className="border border-slate-300 text-center ">Amount</th>
                            <th className="border border-slate-300 text-center">Date</th>
                            <th className="border border-slate-300 text-center ">Counter</th>
                            <th className="border border-slate-300 text-center">Cashier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10">
                            <td className="border border-slate-300 text-center w-[5px]">1</td>
                            <td className="border border-slate-300 text-left">2301001</td>
                            <td className="border border-slate-300 text-left">9856453</td>
                            <td className="border border-slate-300 text-center">2000</td>
                            <td className="border border-slate-300 text-center">2023-01-01</td>
                            <td className="border border-slate-300 text-center">1</td>
                            <td className="border border-slate-300 text-center">LMN</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}