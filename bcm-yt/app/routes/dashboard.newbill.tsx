import { IBill, IItem } from '~/domain/bill-domain'
import { del } from '../icons'
import { ChangeEvent, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { CustomerRepository } from '~/repository/customer-repository';
import { BillRepository } from '~/repository/bill-repository';

const customerRepository = new CustomerRepository()
const billRepository = new BillRepository()

interface IpErr {
    itemName: { isInitial: boolean, msg: string, isValid: boolean };
    price: { isInitial: boolean, msg: string, isValid: boolean };
    quantity: { isInitial: boolean, msg: string, isValid: boolean }
}

async function isCustomerAvailable(mobile: string) {
    const cst = await customerRepository.details(mobile)
    return !!cst    
}


async function onChkCstAv(fd: FormData) {

    const customerMobile = String(fd.get('customerMobile'))

    const mobileRegex = /^[0-9]{10}$/
    if (!customerMobile.match(mobileRegex)) {
        return json({ msg: 'Invalid Mobile Number', isCstAv: false , isFormValid: false })
    }

    const isCstAv = await isCustomerAvailable(customerMobile)
    if (isCstAv) {
        return json({ msg: 'Customer Found', isCstAv, isFormValid: true })
    }
    return json({ msg: 'Customer Not Found', isCstAv,  isFormValid: false })

}

async function onChkOt(fd: FormData) {

    const customerMobile = String(fd.get('customerMobile'))
    const items = fd.getAll('items')
    const prices = fd.getAll('prices')
    const quantities = fd.getAll('quantities')
    const mode = String(fd.get('mode'))
    const cashier = String(fd.get('cashier'))
    const counter = Number(fd.get('counter'))
    const amount = Number(fd.get('amount'))

    const mobileRegex = /^[0-9]{10}$/
    if (!customerMobile.match(mobileRegex)) {
        return json({ msg: 'Invalid Mobile Number', isCstAv: false , isFormValid: false })
    }

    const isCstAv = await isCustomerAvailable(customerMobile)
    if (!isCstAv) {
        return json({ msg: 'Customer Not Found', isCstAv, isFormValid: false })
    }

    if (items.length == 0 || prices.length == 0 || quantities.length == 0) {
        return json({ msg: 'No Items Found', isCstAv, isFormValid: false })
    }

    const processed = items.map((item, index) => ({
        'itemName': String(item),
        'price': Number(prices[index]),
        'quantity': Number(quantities[index])
    }))

    console.log(processed)

    const billDate = new Date('2023-02-01').toISOString().split('T')[0]
    const smNo = uuidv4()
    const billNo = `BILL${smNo.split('-')[0]}`
    const bill: IBill = { billNo, customerMobile, items: [...processed], mode, cashier, billDate, counter, amount }

    // db query to save the bill
    await billRepository.newBill(bill)

    return redirect('../bills')
}

export async function action({ request }: ActionFunctionArgs) {

    const fd = await request.formData()

    const subTyp = String(fd.get('subTyp'))

    if (subTyp == 'cstAv') return onChkCstAv(fd)
    return onChkOt(fd)
}

export default function NewBill() {

    const ac = useActionData<typeof action>()
    const { msg, isFormValid } = ac || {}

    const [billItems, setBillItems] = useState<IItem[]>([])

    const [billItem, setBillItem] = useState<IItem>({
        id: '',
        itemName: '',
        price: 0,
        quantity: 0
    })

    const [total, setTotal] = useState<number>(0)
    const [gst, setGst] = useState<number>(0)

    const [isCstAv, setCstAv] = useState<boolean>(false)

    const [errors, setErrors] = useState<IpErr>({
        itemName: { isInitial: true, msg: 'Mandetory', isValid: false },
        price: { isInitial: true, msg: 'Non zero Non Negative', isValid: false },
        quantity: { isInitial: true, msg: 'Non zero Non negative', isValid: false },
    })

    const onItemAdd = () => validateItems()
    // 

    const onItemDlt = (id: string) => {
        const updatedBillItems = billItems.filter(it => it.id != id)
        setBillItems(updatedBillItems)
    }

    const onIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(`Name ${name} Value ${value}`)

        if (((name === 'price') || (name === 'quantity')) && isNaN(Number(value))) return

        setBillItem(old => ({ ...old, id: uuidv4(), [name]: value }))
    }

    useEffect(() => {
        const amt = billItems.reduce((acc, it) => {
            return acc + ((it.price || 0) * (it.quantity || 0))
        }, 0)

        setTotal(amt)

        setGst((amt * 18) / 100)

    }, [billItems])

    useEffect(() => {

        const allValid = errors.itemName.isValid && errors.price.isValid && errors.quantity.isValid

        if (allValid) {
            setBillItems(old => ([...old, billItem]))

            setBillItem({ id: '', itemName: '', price: 0, quantity: 0 })
        }

    }, [errors])

    useEffect(() => {
        setCstAv(ac?.isCstAv || false)
    }, [ac])

    const validateItems = () => {
        if (billItem.itemName === undefined || billItem.itemName === '' || billItem.itemName.trim() === '') {
            // error: Invalid Item Name
            setErrors(old => ({ ...old, itemName: { isInitial: false, msg: 'Invalid Item Name', isValid: false } }))
        } else {

            const isAdded = billItems.some(it => it.itemName?.toLowerCase() === billItem.itemName?.toLowerCase())
            if (isAdded) {
                setErrors(old => ({ ...old, itemName: { isInitial: false, msg: 'Item Already added', isValid: false } }))
            } // error: Item already added
            else {
                setErrors(old => ({ ...old, itemName: { isInitial: false, msg: 'Item Name Okay', isValid: true } }))
            } // success : Item Name is valid
        }

        if (billItem.price == undefined || (billItem.price <= 0)) {
            // error: invalid price

            setErrors(old => ({ ...old, price: { isInitial: false, msg: 'Invalid Price', isValid: false } }))
        }
        else {
            // success : Item Price is valid
            setErrors(old => ({ ...old, price: { isInitial: false, msg: 'Price Okay', isValid: true } }))
        }

        if (billItem.quantity === undefined || (billItem.quantity <= 0)) {
            // error : Item Quantity invalid
            setErrors(old => ({ ...old, quantity: { isInitial: false, msg: 'Invalid Quantity', isValid: false } }))
        }
        else {
            // success : Item Quantity is valid
            setErrors(old => ({ ...old, quantity: { isInitial: false, msg: 'Quantity Okay', isValid: true } }))
        }
    }

    return (
        <Form className="container h-[100%]" method='POST'>

            <div className="ml-5 mt-5">
                <h1 className="text-4xl"> New Bill </h1>
            </div>

            <div className="flex w-[95%] justify-between ml-5 mt-5">
                <div className="flex w-[30%] justify-start items-end">
                    <div className="flex flex-col">
                        <label htmlFor="customerMobile">Mobile</label>
                        <input type="text" id="customerMobile" name='customerMobile' placeholder="Mobile" className="bg-slate-200 h-10 p-2" />
                    </div>
                    {/* <input type="submit" value="Search" className="w-20 h-10 ml-3 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900" /> */}
                    <button type="submit" name='subTyp' value='cstAv' className="w-20 h-10 ml-3 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900" >Search</button>
                </div>

                <div className="flex flex-col w-[15%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Date:</span>
                        <span>{new Date().toISOString().split('T')[0]}</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Cashier:</span>
                        <span>
                            <select name='cashier'>
                                <option> Admin </option>
                                <option> James </option>
                                <option> Lora </option>
                                <option> Satish </option>
                            </select>
                        </span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Counter:</span>
                        <span>
                            <select name='counter'>
                                <option> 1 </option>
                                <option> 2 </option>
                                <option> 3 </option>
                                <option> 4 </option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            <hr className="m-5" />

            <div className="flex w-[95%] ml-5 mt-5">
                {
                    ac && !isFormValid && (
                        <div className='bg-red-400 w-[100%] p-3 mb-5 text-white'>
                            {msg}
                        </div>
                    )
                }
            </div>

            {
                isCstAv && (
                    <>
                        <div className="flex w-[55%] ml-5">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                    <label htmlFor="itemName" className='text-gray-400'>Item</label>
                                    <input type="text" name='itemName' id="itemName" placeholder="Item" className="bg-slate-200 h-10 p-2" onChange={onIpCh} value={billItem.itemName} />
                                    <label className={`${(errors.itemName.isInitial || errors.itemName.isValid) ? 'text-green-600' : 'text-red-600'} text-[0.7rem]`}>{errors.itemName.msg}</label>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="price" className='text-gray-400'>Price</label>
                                    <input type="text" name='price' id="price" placeholder="Price" className="bg-slate-200 h-10 p-2" onChange={onIpCh} value={billItem.price} />
                                    <label className={`${(errors.price.isInitial || errors.price.isValid) ? 'text-green-600' : 'text-red-600'} text-[0.7rem]`}>{errors.price.msg}</label>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="quantity" className='text-gray-400'>Quantity</label>
                                    <input type="text" name='quantity' id="quantity" placeholder="Quantity" className="bg-slate-200 h-10 p-2" onChange={onIpCh} value={billItem.quantity} />
                                    <label className={`${(errors.quantity.isInitial || errors.quantity.isValid) ? 'text-green-600' : 'text-red-600'} text-[0.7rem]`}>{errors.quantity.msg}</label>
                                </div>
                                <div className="flex">
                                    <input type="button" value="Add" className="w-20 h-10 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900" onClick={onItemAdd} />
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 ml-5 w-[80%]'>

                            <table className='table-fixed w-[100%] shadow-lg bg-white'>
                                <thead>
                                    <tr className='h-10 bg-slate-100'>
                                        <th className='border border-slate-300 w-[5%]'>Sr</th>
                                        <th className='border border-slate-300 w-[20%] text-left'><span className='ml-3'>Item</span></th>
                                        <th className='border border-slate-300 w-[25%] ml-3'><span className='ml-3'>Price</span></th>
                                        <th className='border border-slate-300 w-[25%] ml-3'><span className='ml-3'>Quantity</span></th>
                                        <th className='border border-slate-300'>Total</th>
                                        <th className='border border-slate-300'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        billItems.map(({ id, itemName, price, quantity }, ind) => (
                                            <tr className='h-10' key={id}>
                                                <td className='border border-slate-300 text-center'>{ind + 1}</td>
                                                <td className='border border-slate-300 ml-3'><input type='text' name='items' className='w-[90%] whitespace-nowrap bg-white pl-2' value={itemName} readOnly /></td>
                                                <td className='border border-slate-300 ml-3 text-center'><input type='text' name='prices' className='w-[90%] whitespace-nowrap bg-white pl-2' value={price} readOnly /></td>
                                                <td className='border border-slate-300 ml-3 text-center'><input type='text' name='quantities' className='w-[90%] whitespace-nowrap bg-white pl-2' value={quantity} readOnly /></td>
                                                <td className='border border-slate-300 text-center'>{(price || 0) * (quantity || 0)}</td>
                                                <td className='border border-slate-300 text-center'>
                                                    <div className='flex justify-center items-center'>
                                                        <span className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-800' onClick={() => onItemDlt(id || '')}>{del}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        )
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
                                            <input type='number' name='amount' value={total + gst} className='w-[90%] whitespace-nowrap bg-white pl-2 text-center' readOnly />
                                        </th>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className='flex flex-row-reverse w-[80%] ml-5 mt-5'>
                            {/* <input type='submit' value='Checkout' className='w-20 h-10 ml-3 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900' /> */}
                            <button type='submit' name='subTyp' value='chk' className='w-20 h-10 ml-3 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900' >Checkout</button>
                            <select className='border border-gray-400' name='mode'>
                                <option value='upi'>UPI</option>
                                <option value='card'>CARD</option>
                                <option value='cash'>Cash</option>
                            </select>
                        </div>
                    </>
                )
            }

        </Form>
    )
}