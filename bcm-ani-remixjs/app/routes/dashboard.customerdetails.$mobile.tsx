import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params } : LoaderFunctionArgs) {
    return json({
        cstDtls: {
            mobile: `${params.mobile}`,
            name: 'abc',
            email: 'aa@ff.com',
            dob: '1990-01-01'
        },
        rcTxns: [
            {
                billNo: "1234",
                date: "2020-01-01",
                amount: 112,
                mode: "UPI",
            },
            {
                billNo: "45678",
                date: "2020-01-01",
                amount: 980,
                mode: "CARD",
            },
            {
                billNo: "34568",
                date: "2020-01-01",
                amount: 980,
                mode: "UPI",
            },
        ]
    })
}

export default function CustomerDetails() {

    const { cstDtls, rcTxns } = useLoaderData<typeof loader>();

    const { mobile, name, email, dob } = cstDtls

    return (
        <section className="flex flex-col w-full h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> Customer Details </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 w-1/4 h-fit bg-white shadow-lg p-5 mt-3">
                <label >Mobile</label><label className="border-l pl-2">{mobile}</label>
                <label >Name</label><label className="border-l pl-2">{name}</label>
                <label >Email</label><label className="border-l pl-2">{email}</label>
                <label >DOB</label><label className="border-l pl-2">{dob}</label>
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
                            rcTxns.map(({billNo, date, amount, mode}, sr) =>
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr+1}</td>
                                    <td className="border border-slate-300 text-left"><Link to={`../billdetails/${123}`}><u className="ml-3">{billNo}</u></Link></td>
                                    <td className="border border-slate-300 text-center">{date}</td>
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