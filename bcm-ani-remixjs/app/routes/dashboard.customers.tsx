import { Link } from "@remix-run/react";

import { newCustomer, edit, delBtn } from "../icons"

export default function Customers() {
    return (
        <section className="container w-full h-full">

            <div className="flex justify-between items-center w-[80%] mt-5">
                <h1 className="text-3xl mx-3 w-[20%]"> Customers </h1>
                <div className="flex justify-between w-[30%]">
                    <Link className="flex rounded-full border bg-lime-600 p-2 text-white" to={'../newcustomer'}> <span>{newCustomer}</span><span className="ml-1">Add</span></Link>
                    <input type="text" placeholder="Search" className="bg-slate-200" />
                </div>
            </div>

            <div className="mt-5">
                <table className="table-auto border-collapse border border-slate-400 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300">Sr</th>
                            <th className="border border-slate-300 text-left">Mobile</th>
                            <th className="border border-slate-300 text-left">Name</th>
                            <th className="border border-slate-300 text-center">Since</th>
                            <th className="border border-slate-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10">
                            <td className="border border-slate-300 text-center">1</td>
                            <td className="border border-slate-300 text-left"><Link to={`../customerdetails/${234}`}><u>9988665544</u></Link></td>
                            <td className="border border-slate-300 text-left">Abc</td>
                            <td className="border border-slate-300 text-center">1890</td>
                            <td className="border border-slate-300 text-center"><span className="flex items-center justify-center"><span className="text-blue-700">{edit}</span><span className="ml-2 text-red-700">{delBtn}</span></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}