import { Link, useLoaderData } from '@remix-run/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { IBill } from '~/domain/bill-domain'

import { json } from '@remix-run/node'

export async function loader() {
    return json([
        {
            "customerMobile": "1234567890",
            "billNo": "BILL001",
            "amount": 100.00,
            "billDate": "2000-01-01",
            "cashier": "John Doe",
            "counter": 1,
            "mode": "Cash",
            "items": [
                {
                    "id": "1",
                    "itemName": "Item A",
                    "price": 10.00,
                    "quantity": 2
                },
                {
                    "id": "2",
                    "itemName": "Item B",
                    "price": 5.00,
                    "quantity": 3
                }
            ]
        },
        {
            "customerMobile": "2345678901",
            "billNo": "BILL002",
            "amount": 75.50,
            "billDate": "2023-10-15",
            "cashier": "Jane Smith",
            "counter": 2,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "3",
                    "itemName": "Item C",
                    "price": 15.50,
                    "quantity": 2
                },
                {
                    "id": "4",
                    "itemName": "Item D",
                    "price": 20.00,
                    "quantity": 2
                }
            ]
        },
        {
            "customerMobile": "3456789012",
            "billNo": "BILL003",
            "amount": 45.25,
            "billDate": "2023-10-15",
            "cashier": "David Johnson",
            "counter": 3,
            "mode": "Cash",
            "items": [
                {
                    "id": "5",
                    "itemName": "Item E",
                    "price": 7.25,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "4567890123",
            "billNo": "BILL004",
            "amount": 30.00,
            "billDate": "2022-11-11",
            "cashier": "Alice Davis",
            "counter": 4,
            "mode": "Cash",
            "items": [
                {
                    "id": "6",
                    "itemName": "Item F",
                    "price": 5.00,
                    "quantity": 6
                }
            ]
        },
        {
            "customerMobile": "5678901234",
            "billNo": "BILL005",
            "amount": 120.75,
            "billDate": "1990-01-01",
            "cashier": "Bob Wilson",
            "counter": 5,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "7",
                    "itemName": "Item G",
                    "price": 15.25,
                    "quantity": 6
                }
            ]
        },
        {
            "customerMobile": "6789012345",
            "billNo": "BILL006",
            "amount": 50.00,
            "billDate": "2000-01-03",
            "cashier": "Ella Martinez",
            "counter": 6,
            "mode": "Cash",
            "items": [
                {
                    "id": "8",
                    "itemName": "Item H",
                    "price": 10.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "7890123456",
            "billNo": "BILL007",
            "amount": 80.50,
            "billDate": "2023-10-15",
            "cashier": "Mike Brown",
            "counter": 7,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "9",
                    "itemName": "Item I",
                    "price": 8.50,
                    "quantity": 10
                }
            ]
        },
        {
            "customerMobile": "8901234567",
            "billNo": "BILL008",
            "amount": 25.00,
            "billDate": "2023-10-15",
            "cashier": "Sophia Lee",
            "counter": 8,
            "mode": "Cash",
            "items": [
                {
                    "id": "10",
                    "itemName": "Item J",
                    "price": 5.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "9012345678",
            "billNo": "BILL009",
            "amount": 60.00,
            "billDate": "2021-10-10",
            "cashier": "Oliver Taylor",
            "counter": 9,
            "mode": "Cash",
            "items": [
                {
                    "id": "11",
                    "itemName": "Item K",
                    "price": 12.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "0123456789",
            "billNo": "BILL010",
            "amount": 95.00,
            "billDate": "2021-01-05",
            "cashier": "Mia Miller",
            "counter": 10,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "12",
                    "itemName": "Item L",
                    "price": 15.83,
                    "quantity": 6
                }
            ]
        },
        {
            "customerMobile": "1234567890",
            "billNo": "BILL002",
            "amount": 100.00,
            "billDate": "2023-10-15",
            "cashier": "John Doe",
            "counter": 3,
            "mode": "Cash",
            "items": [
                {
                    "id": "1",
                    "itemName": "Item A",
                    "price": 10.00,
                    "quantity": 2
                },
                {
                    "id": "2",
                    "itemName": "Item B",
                    "price": 5.00,
                    "quantity": 3
                }
            ]
        },
        {
            "customerMobile": "2345678901",
            "billNo": "BILL002",
            "amount": 75.50,
            "billDate": "2023-10-15",
            "cashier": "Jane Smith",
            "counter": 2,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "3",
                    "itemName": "Item C",
                    "price": 15.50,
                    "quantity": 2
                },
                {
                    "id": "4",
                    "itemName": "Item D",
                    "price": 20.00,
                    "quantity": 2
                }
            ]
        },
        {
            "customerMobile": "2345678901",
            "billNo": "BILL002",
            "amount": 75.50,
            "billDate": "2023-10-15",
            "cashier": "Jane Smith",
            "counter": 2,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "3",
                    "itemName": "Item C",
                    "price": 15.50,
                    "quantity": 2
                },
                {
                    "id": "4",
                    "itemName": "Item D",
                    "price": 20.00,
                    "quantity": 2
                }
            ]
        },
        {
            "customerMobile": "3456789012",
            "billNo": "BILL003",
            "amount": 45.25,
            "billDate": "2023-10-15",
            "cashier": "David Johnson",
            "counter": 3,
            "mode": "Cash",
            "items": [
                {
                    "id": "5",
                    "itemName": "Item E",
                    "price": 7.25,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "4567890123",
            "billNo": "BILL004",
            "amount": 30.00,
            "billDate": "2023-10-15",
            "cashier": "Alice Davis",
            "counter": 4,
            "mode": "Cash",
            "items": [
                {
                    "id": "6",
                    "itemName": "Item F",
                    "price": 5.00,
                    "quantity": 6
                }
            ]
        },
        {
            "customerMobile": "5678901234",
            "billNo": "BILL005",
            "amount": 120.75,
            "billDate": "2023-10-15",
            "cashier": "Bob Wilson",
            "counter": 5,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "7",
                    "itemName": "Item G",
                    "price": 15.25,
                    "quantity": 6
                }
            ]
        },
        {
            "customerMobile": "6789012345",
            "billNo": "BILL006",
            "amount": 50.00,
            "billDate": "2023-10-15",
            "cashier": "Ella Martinez",
            "counter": 6,
            "mode": "Cash",
            "items": [
                {
                    "id": "8",
                    "itemName": "Item H",
                    "price": 10.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "7890123456",
            "billNo": "BILL007",
            "amount": 80.50,
            "billDate": "2023-10-15",
            "cashier": "Mike Brown",
            "counter": 7,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "9",
                    "itemName": "Item I",
                    "price": 8.50,
                    "quantity": 10
                }
            ]
        },
        {
            "customerMobile": "8901234567",
            "billNo": "BILL008",
            "amount": 25.00,
            "billDate": "2023-10-15",
            "cashier": "Sophia Lee",
            "counter": 8,
            "mode": "Cash",
            "items": [
                {
                    "id": "10",
                    "itemName": "Item J",
                    "price": 5.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "9012345678",
            "billNo": "BILL009",
            "amount": 60.00,
            "billDate": "2023-10-15",
            "cashier": "Oliver Taylor",
            "counter": 9,
            "mode": "Cash",
            "items": [
                {
                    "id": "11",
                    "itemName": "Item K",
                    "price": 12.00,
                    "quantity": 5
                }
            ]
        },
        {
            "customerMobile": "0123456789",
            "billNo": "BILL010",
            "amount": 95.00,
            "billDate": "2023-10-15",
            "cashier": "Mia Miller",
            "counter": 10,
            "mode": "Credit Card",
            "items": [
                {
                    "id": "12",
                    "itemName": "Item L",
                    "price": 15.83,
                    "quantity": 6
                }
            ]
        }
    ])
}

export default function Bills() {

    const bills = useLoaderData<typeof loader>()
    
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
                <form className='grid grid-cols-3 gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="billNo">Bill No</label>
                        <input id="billNo" type="text" className='h-10 p-2' placeholder='Bill No' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="customerMobile">Mobile</label>
                        <input id="customerMobile" type="text" className='h-10 p-2' placeholder='Mobile' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="billDate">Bill Date</label>
                        <input id="billDate" type="date" className='h-10 p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="counter">Counter</label>
                        <input id="counter" type="number" className='h-10 p-2' placeholder='Counter' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="cashier">Cashier</label>
                        <input id="cashier" type="text" className='h-10 p-2' placeholder='Cashier' />
                    </div>
                    <div className='flex justify-start items-end'>
                        <input type="button" value='Search' className='w-20 h-10 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900' />
                    </div>
                </form>
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
                                    <td className='border border-slate-300 text-center'>{billDate}</td>
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