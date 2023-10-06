import { Link, useActionData, Form, useLoaderData } from "@remix-run/react";
import { newBill } from "../icons"

import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { ChangeEvent, useEffect, useState } from "react";

import { BillRepository, SearchFilter } from '../repository/bill-repository'

const billRepository = new BillRepository()

function createConverter(form: FormData) {
    return function getValueAsType<T>(fieldName: string, converter: (value: string) => T): T | undefined {
        const value = form.get(fieldName);
        return value ? converter(value as string) : undefined;
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const converter = createConverter(form);

    const customerMobile = converter('customerMobile', String);
    const billNo = converter('billNo', String);
    const billDate = converter('billDate', (value) => new Date(value));
    const counter = converter('counter', Number);
    const cashier = converter('cashier', String);
    const amount = converter('amount', Number);

    const raw: SearchFilter = { customerMobile, billNo, billDate, counter, cashier, amount }

    const fltBls = await billRepository.searchBills(raw)

    return json({ fltBls })
}

export async function loader() {

    const bills = await billRepository.bills()
    return json(bills)
}

export default function Bills() {

    const bills = useLoaderData<typeof loader>().map(bls => ({ ...bls, billDate: new Date(bls.billDate) }));
    const actionData = useActionData<typeof action>();
    const { fltBls } = actionData || {}

    const [filtered, setFiltered] = useState<SearchFilter[]>(bills)

    const [serachFilter, setSearchFilter] = useState<SearchFilter>({
        amount: 0,
        billDate: new Date(),
        customerMobile: '',
        billNo: '',
        cashier: '',
        counter: 0
    })

    const [localFilter, setLocalFilter] = useState<SearchFilter>({
        amount: 0,
        billDate: new Date(),
        customerMobile: '',
        billNo: '',
        cashier: '',
        counter: 0
    })

    const onIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if ((name === "counter" || name === "amount" || name === "customerMobile") && isNaN(Number(value))) return;
        setSearchFilter(old => ({ ...old, [name]: value }))
    }

    const onFilterIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if ((name === "counter" || name === "amount" || name === "customerMobile") && isNaN(Number(value))) return;

        setLocalFilter(old => ({ ...old, [name]: value }))
    }

    useEffect(() => {
        if (fltBls) setFiltered(fltBls.map((bl) => ({ ...bl, billDate: new Date(bl.billDate) } as SearchFilter)))
    }, [actionData])

    useEffect(() => {

        if (Object.values(localFilter).every(fl => !fl)) {
            setFiltered(bills)
        } else {

            const flt = bills.filter(({ customerMobile, amount, billDate, billNo, cashier, counter }) => {

                console.log(`${billDate} -> ${localFilter.billDate}`)
                console.log(`${billDate == localFilter.billDate}`)
                const mobileMatch = (localFilter.customerMobile && localFilter.customerMobile.trim() != '') ? customerMobile.includes(localFilter.customerMobile) : true
                const amountMatch = localFilter.amount ? (amount == localFilter.amount) : true
                const billDateMatch = localFilter.billDate ? (billDate.toISOString().split('T')[0] == localFilter.billDate.toISOString().split('T')[0]) : true
                const billNoMatch = (localFilter.billNo && localFilter.billNo.trim() != '') ? billNo.includes(localFilter.billNo) : true
                const cashierMatch = (localFilter.cashier && localFilter.cashier.trim() != '') ? cashier.includes(localFilter.cashier) : true
                const counterMatch = localFilter.counter ? (counter == localFilter.counter) : true

                return (mobileMatch && amountMatch && billDateMatch && billNoMatch && cashierMatch && counterMatch)
            })

            setFiltered(flt)
        }

    }, [localFilter])


    return (
        <section className="container w-screen h-screen">
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
                        <input id="mobile" name='customerMobile' type="text" className="h-10 p-2 bg-slate-200" placeholder="Mobile" onChange={onIpChange} value={serachFilter?.customerMobile} />
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
                                <input type="text" name="customerMobile" className="w-[80%] h-10 p-2 border bg-slate-200" placeholder="Mobile" onChange={onFilterIpChange} value={localFilter.customerMobile} />
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
                            filtered.map(({ customerMobile, amount, billDate, billNo, cashier, counter }, sr) =>
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr + 1}</td>
                                    <td className="border border-slate-300 text-left"><Link to={`../billdetails/${billNo}`}><u className="ml-2">{billNo}</u></Link></td>
                                    <td className="border border-slate-300 text-left"><Link to={`../customerdetails/${customerMobile}`}><u className="ml-2">{customerMobile}</u></Link></td>
                                    <td className="border border-slate-300 text-center">{amount}</td>
                                    <td className="border border-slate-300 text-center">{billDate?.toISOString().split('T')[0]}</td>
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