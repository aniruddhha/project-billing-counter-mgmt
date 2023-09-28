import { Link, useActionData, Form, useLoaderData } from "@remix-run/react";
import { newBill } from "../icons"

import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { ChangeEvent, useEffect, useState } from "react";

interface SearchFilter {
    mobile: string | undefined;
    billNo: string | undefined;
    billDate: string | Date | undefined;
    counter: number | undefined;
    cashier: string | undefined;
    amount: number | undefined;
}

function createConverter(form: FormData) {
    return function getValueAsType<T>(fieldName: string, converter: (value: string) => T): T | undefined {
      const value = form.get(fieldName);
      return value ? converter(value as string) : undefined;
    };
  }

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const converter = createConverter(form);

    const mobile = converter('mobile', String);
    const billNo = converter('billNo', String);
    const billDate = converter('billDate', (value) => new Date(value));
    const counter = converter('counter', Number);
    const cashier = converter('cashier', String);
    const amount = converter('amount', Number);

    const raw: SearchFilter = { mobile, billNo, billDate, counter, cashier, amount }

    return { raw }
}

export async function loader() {
    return json([
        {
            mobile: "1234567890",
            billNo: "5432",
            billDate: "2023-09-15",
            counter: 3,
            cashier: "John Doe",
            amount: 150.5,
        },
        {
            mobile: "9876543210",
            billNo: "7890",
            billDate: "2023-09-14",
            counter: 2,
            cashier: "Jane Smith",
            amount: 75.25,
        },
        {
            mobile: "5555555555",
            billNo: "1234",
            billDate: "2023-09-13",
            counter: 1,
            cashier: "Alice Johnson",
            amount: 200.0,
        },
        {
            mobile: "9998887777",
            billNo: "2468",
            billDate: "2023-09-12",
            counter: 4,
            cashier: "Bob Williams",
            amount: 45.75,
        },
        {
            mobile: "7777777777",
            billNo: "1357",
            billDate: "2023-09-11",
            counter: 5,
            cashier: "Eve Davis",
            amount: 85.0,
        },
        {
            mobile: "1112223333",
            billNo: "6789",
            billDate: "2023-09-10",
            counter: 2,
            cashier: "Frank White",
            amount: 120.0,
        },
        {
            mobile: "4444444444",
            billNo: "9876",
            billDate: "2023-09-09",
            counter: 3,
            cashier: "Grace Brown",
            amount: 95.99,
        },
        {
            mobile: "6666666666",
            billNo: "5432",
            billDate: "2023-09-08",
            counter: 1,
            cashier: "Henry Lee",
            amount: 60.25,
        },
        {
            mobile: "3333333333",
            billNo: "1122",
            billDate: "2023-09-07",
            counter: 6,
            cashier: "Ivy Taylor",
            amount: 175.0,
        },
        {
            mobile: "8888888888",
            billNo: "4567",
            billDate: "2023-09-15",
            counter: 4,
            cashier: "Jack Johnson",
            amount: 33.5,
        },
    ])
}

export default function Bills() {

    const bills = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const { raw } = actionData || {}

    const [filtered, setFiltered] = useState<SearchFilter[]>(bills)

    const [serachFilter, setSearchFilter] = useState<SearchFilter>({
        mobile: undefined,
        amount: undefined,
        billDate: undefined,
        billNo: undefined,
        cashier: undefined,
        counter: undefined
    })

    const [localFilter, setLocalFilter] = useState<SearchFilter>({
        mobile: undefined,
        amount: undefined,
        billDate: undefined,
        billNo: undefined,
        cashier: undefined,
        counter: undefined
    })

    const onIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if ((name === "counter" || name === "amount" || name === "mobile") && isNaN(Number(value))) return;
        setSearchFilter(old => ({ ...old, [name]: value }))
    }

    const onFilterIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if ((name === "counter" || name === "amount" || name === "mobile" || name === 'billNo') && isNaN(Number(value))) return;

        setLocalFilter(old => ({ ...old, [name]: value }))
    }

    useEffect(() => {

        const flt = bills.filter(({ mobile, amount, billDate, billNo, cashier, counter }) => {

            const mobileMatch = (localFilter.mobile && localFilter.mobile.trim() != '') ? mobile.includes(localFilter.mobile) : true
            const amountMatch = localFilter.amount ? (amount == localFilter.amount) : true
            const billDateMatch = localFilter.billDate ? (billDate == localFilter.billDate) : true
            const billNoMatch = (localFilter.billNo && localFilter.billNo.trim() != '') ? billNo.includes(localFilter.billNo) : true
            const cashierMatch = (localFilter.cashier && localFilter.cashier.trim() != '') ? cashier.includes(localFilter.cashier) : true
            const counterMatch = localFilter.counter ? (counter == localFilter.counter) : true

            return (mobileMatch && amountMatch && billDateMatch && billNoMatch && cashierMatch && counterMatch)
        })

        setFiltered(flt)

    }, [localFilter])


    return (
        <section className="container w-screen">
          
            <div className="flex justify-between items-center w-[80%] mt-5">
                <h1 className="text-3xl mx-3 w-[20%]"> Bills </h1>

                <Link className="flex justify-center items-center rounded-full border bg-lime-600 p-2 text-white" to={'../newbill'}>
                    <span>{newBill}</span>
                    <span className="px-2">New Bill</span>
                </Link>
            </div>

            <fieldset className="border border-gray-300 p-8 w-[60%] bg-white shadow-lg mt-5">
                <legend className="text-[0.8rem] px-3">Search Filter</legend>
                <Form method="post" className="grid grid-cols-3 gap-5 h-[10%]">
                    <div className="h-15 flex flex-col">
                        <label htmlFor="mobile">Mobile</label>
                        <input id="mobile" name='mobile' type="text" className="h-10 p-2 bg-slate-200" placeholder="Mobile" onChange={onIpChange} value={serachFilter?.mobile} />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="billNo">Bill No</label>
                        <input id="billNo" name='billNo' type="text" className="h-10 p-2 bg-slate-200" placeholder="Bill Number" onChange={onIpChange} value={serachFilter?.billNo} />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="billDate">Bill Date</label>
                        <input id="billDate" name='billDate' type="date" className="h-10 p-2 bg-slate-200" placeholder="Date" onChange={onIpChange} value={serachFilter.billDate && serachFilter.billDate.toString()} />
                    </div>

                    <div className="h-15 flex flex-col">
                        <label htmlFor="counter">Counter</label>
                        <input id="counter" type="number" name="counter" className="h-10 p-2 bg-slate-200" placeholder="Counter" onChange={onIpChange} value={serachFilter?.counter} />
                    </div>
                    <div className="h-15 flex flex-col">
                        <label htmlFor="cashier">Cashier</label>
                        <input id="cashier" type="text" name="cashier" className="h-10 p-2 bg-slate-200" placeholder="Cashier" onChange={onIpChange} value={serachFilter?.cashier} />
                    </div>
                    <div className="h-15 flex items-end">
                        <input type="submit" value="Search" className="border bg-blue-500 hover:bg-blue-700 active:bg-blue-800 w-20 h-10 text-white" />
                    </div>
                </Form>
            </fieldset>

            <div className="mt-5 w-[80%] border">
                <table className="table-fixed border-collapse border border-slate-400 bg-white shadow-lg">
                    <thead>
                        <tr className="h-20">
                            <th className="border border-slate-200 w-[3%]"></th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" name="billNo" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Bill Number" onChange={onFilterIpChange} value={localFilter.billNo} />
                            </th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" name="mobile" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Mobile" onChange={onFilterIpChange} value={localFilter.mobile} />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="text" name="amount" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Amount" onChange={onFilterIpChange} value={localFilter.amount} />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="date" name="billDate" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Date" onChange={onFilterIpChange} value={localFilter.billDate && localFilter.billDate.toString()} />
                            </th>
                            <th className="border border-slate-300 text-center w-[10%]">
                                <input type="text" name="cashier" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Cashier" onChange={onFilterIpChange} value={localFilter.cashier} />
                            </th>
                            <th className="border border-slate-300 text-center w-[8%]">
                                <input type="text" name="counter" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Counter" onChange={onFilterIpChange} value={localFilter.counter} />
                            </th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300">Sr</th>
                            <th className="border border-slate-300 text-left"><span className="ml-2">Bill Number</span></th>
                            <th className="border border-slate-300 text-left "><span className="ml-2">Mobile</span></th>
                            <th className="border border-slate-300 text-center ">Amount</th>
                            <th className="border border-slate-300 text-center">Date</th>
                            <th className="border border-slate-300 text-center">Cashier</th>
                            <th className="border border-slate-300 text-center ">Counter</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filtered.map(({ mobile, amount, billDate, billNo, cashier, counter }, sr) =>
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr + 1}</td>
                                    <td className="border border-slate-300 text-left"><Link to={`../billdetails/${billNo}`}><u className="ml-2">{billNo}</u></Link></td>
                                    <td className="border border-slate-300 text-left"><Link to={`../customerdetails/${mobile}`}><u className="ml-2">{mobile}</u></Link></td>
                                    <td className="border border-slate-300 text-center">{amount}</td>
                                    <td className="border border-slate-300 text-center">{billDate?.toString()}</td>
                                    <td className="border border-slate-300 text-center">{cashier}</td>
                                    <td className="border border-slate-300 text-center">{counter}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div>
                Pagination
            </div>

        </section>
    )
}