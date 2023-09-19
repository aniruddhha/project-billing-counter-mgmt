import { newCustomer, edit, delBtn } from "../icons"

export default function CustomerDetails() {
    return (
        <section className="flex flex-col w-full h-full">
            <div className="mt-5">
                <h1 className="text-3xl"> Customer Details </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/4 h-fit bg-white shadow-lg p-5 mt-3">
                <label >Mobile</label><label className="border-l pl-2">87900</label>
                <label >Name</label><label className="border-l pl-2">Abc</label>
                <label >Email</label><label className="border-l pl-2">Abc@dd.com</label>
                <label >DOB</label><label className="border-l pl-2">1918-01-01</label>
            </div>

            <div className="mt-5">
                <table className="table-auto border-collapse border border-slate-400 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300">Sr</th>
                            <th className="border border-slate-300 text-left">Bill</th>
                            <th className="border border-slate-300 text-center">Date</th>
                            <th className="border border-slate-300 text-center">Amount</th>
                            <th className="border border-slate-300 text-center">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10">
                            <td className="border border-slate-300 text-center">1</td>
                            <td className="border border-slate-300 text-left"><u>2301001</u></td>
                            <td className="border border-slate-300 text-center">2020-01-01</td>
                            <td className="border border-slate-300 text-center">1890</td>
                            <td className="border border-slate-300 text-center">UPI</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}