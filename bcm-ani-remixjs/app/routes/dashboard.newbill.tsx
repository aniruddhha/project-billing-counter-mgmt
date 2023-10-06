import { ChangeEvent, useEffect, useState } from "react"
import { delBtn } from "../icons"
import { v4 as uuidv4 } from 'uuid';
import { Form, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { warning } from '../icons'

import { IBill, IItem } from "~/domain/bill-domain";
import { BillRepository } from '../repository/bill-repository'

const billRepository = new BillRepository()

interface IpError {
    item: { isInitial: boolean, msg: string, isValid: boolean };
    price: { isInitial: boolean, msg: string, isValid: boolean };
    quantity: { isInitial: boolean, msg: string, isValid: boolean };
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const customerMobile = String(form.get('customerMobile'))
    const items = form.getAll('items');
    const prices = form.getAll('prices').map(Number);
    const quantities = form.getAll('quantites').map(Number);
    const mode = String(form.get('mode'))
    const cashier = String(form.get('cashier'))
    const counter = Number(form.get('counter'))
    const amount = Number(form.get('amount'))


    if (items.length == 0 || prices.length == 0 || quantities.length == 0) {
        return json({ msg: 'Invalid Form', isFormValid : false })
    }

    const raw = { items, prices, quantities }
    console.log('------ Raw -------')
    console.log(raw)

    const processed = items.map((item, index) => ({
        'itemName': String(item),
        'price': prices[index],
        'quantity': quantities[index]
    }))

    console.log('------ Processed -------')
    console.log(processed)

    const newBill: IBill = { customerMobile, billNo: Math.random().toString(36).slice(-6), billDate: new Date(), amount, mode, cashier, counter, items: [...processed] }

    await billRepository.newBill(newBill)

    return redirect('../bills')
}


export default function NewCustomer() {

    const [billItems, setBillItems] = useState<IItem[]>([])

    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [gst, setGst] = useState<number>(0)

    const [billItem, setBillItem] = useState<IItem>({
        itemName: '',
        price:0,
        quantity:0
    })

    const [errors, setErrors] = useState<IpError>({
        item: { isInitial: true, msg: 'Mandetory', isValid: false },
        price: { isInitial: true, msg: 'Non zero Non negative', isValid: false },
        quantity: { isInitial: true, msg: 'Non zero Non negative', isValid: false }
    })

    useEffect(() => {
        const ttl = billItems.reduce((accumulator, item) => {
            return accumulator + ( (item.price ? item.price : 0) * (item.quantity ? item.quantity: 0 ));
        }, 0)
        setTotalAmount(ttl)

        setGst((ttl * 18) / 100)

    }, [billItems])

    useEffect(() => {
        const allValid = errors.item.isValid && errors.price.isValid && errors.quantity.isValid
        if (allValid) {
            setBillItems(old => [...old, billItem])
            setErrors({
                item: { isInitial: true, msg: 'Mandetory', isValid: false },
                price: { isInitial: true, msg: 'Non zero Non negative', isValid: false },
                quantity: { isInitial: true, msg: 'Non zero Non negative', isValid: false }
            })
            setBillItem({ id: '', itemName: '', price: 0, quantity: 0 })
        }
    }, [errors])

    const onDltClk = (item: IItem) => {
        const updatedBillItems = billItems.filter(it => it.id != item.id)
        setBillItems(updatedBillItems)
    }

    const onAddClk = () => validateItems()

    const validateItems = () => {

        if (billItem.itemName === undefined || billItem.itemName === '' || billItem.itemName?.trim() === '') {
            setErrors(old => ({
                ...old, item: { isInitial: false, msg: 'Need Proper Item Name', isValid: false }
            }))
        }
        else {
            const isAdded = billItems.some(it => it.itemName === billItem.itemName)
            if (isAdded) {
                setErrors(old => ({
                    ...old, item: { isInitial: false, msg: 'Item Already Addeded', isValid: false }
                }))
            } else {
                setErrors(old => ({
                    ...old, item: { isInitial: false, msg: 'Item Okay', isValid: true }
                }))
            }
        }
        if (billItem.price == undefined || (billItem.price <= 0)) {
            setErrors(old => ({
                ...old, price: { isInitial: false, msg: 'Price Must Be Positive', isValid: false }
            }))
        } else {
            setErrors(old => ({
                ...old, price: { isInitial: false, msg: 'Price Okay', isValid: true }
            }))
        }

        if (billItem.quantity == undefined || (billItem.quantity <= 0)) {
            setErrors(old => ({
                ...old, quantity: { isInitial: false, msg: 'Quantity Must Be Positive', isValid: false }
            }))
        } else {
            setErrors(old => ({
                ...old, quantity: { isInitial: false, msg: 'Quantity Okay', isValid: true }
            }))
        }
    }

    const onIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(`${name} -> ${value}`)

        console.log(`${name} -> ${isNaN(Number(value))}`)
        if ((name === "price" || name === "quantity") && isNaN(Number(value))){
            console.log(`Invalid`)
            return;
        } 

        setBillItem(old => ({ ...old, id: uuidv4(), [name]: value }))
    }

    const actionData = useActionData<typeof action>();

    return (
        <Form method='post' className="container flex flex-col w-screen h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> New Bill </h1>
            </div>

            <div className="flex justify-between items-end w-[80%] h-[13%] bg-white shadow-lg mt-5 p-3">
                <div className="flex w-[33%] items-end justify-between p-3">
                    <div className="flex flex-col">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name="customerMobile" id="mobile" className="h-10 p-2 bg-slate-200" placeholder="Mobile" />
                    </div>
                    <input type="button" value="Search" className="border bg-blue-500 text-white w-20 h-10" />
                </div>
                <div className="flex flex-col mr-3 items-end w-[18%]">
                    <p className="flex justify-between w-full">
                        <span>Date: </span><span>{new Date().toISOString().split('T')[0]}</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>Cashier:</span> 
                        <span>
                           <select name='cashier' className="bg-slate-200">
                                <option>Admin</option>
                                <option>Satish</option>
                                <option>James</option>
                                <option>Lalita</option>
                           </select>
                        </span>
                    </p>
                    <p className="flex justify-between w-full mt-2">
                        <span>Counter:</span> 
                        <span >
                            <select name='counter' className="bg-slate-200">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                            </select>
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex w-[60%] h-[13%] bg-white shadow-lg mt-5 items-center">
                <div className="flex justify-between items-end w-full h-20 p-5 mt-5">
                    <div className="flex flex-col">
                        <label htmlFor="itemName">Item</label>
                        <input type="text" id="itemName" name="itemName" className="h-10 p-2 bg-slate-200" placeholder="Item" value={billItem.itemName} onChange={onIpChange} />
                        <label className={`${(errors.item.isInitial || errors.item.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.item.msg}</label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" className="h-10 p-2 bg-slate-200" placeholder="Price" value={billItem.price } onChange={onIpChange} />
                        <label className={`${(errors.price.isInitial || errors.price.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.price.msg}</label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" id="quantity" name="quantity" className="h-10 p-2 bg-slate-200" placeholder="Quantity" value={billItem.quantity} onChange={onIpChange} />
                        <label className={`${(errors.quantity.isInitial || errors.quantity.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.quantity.msg}</label>
                    </div>
                    <div>
                        <input type="button" value="Add" className="bg-lime-600  hover:bg-lime-700 active:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-100 rounded-full border p-2 text-white w-20 mb-5" onClick={onAddClk} />
                    </div>
                </div>
            </div>

            <div className="w-[100%] mt-5">

                { 
                    (actionData && (!actionData.isFormValid))  &&
                    <div className="bg-red-600 w-[80%] flex items-start p-3 mb-5">
                        <span className="text-white">{warning}</span><span className="ml-3 text-white">{actionData.msg}</span>
                    </div>
                }

                <table className="table-fixed border-collapse border border-slate-300 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className=" bg-slate-100 h-10">
                            <th className="w-[5%] border border-slate-300">Sr</th>
                            <th className="w-[20%] border border-slate-300 text-left"><span className="ml-3">Item</span></th>
                            <th className="w-[15%] border border-slate-300 text-center">Price</th>
                            <th className="w-[15%] border border-slate-300 text-center">Quantity</th>
                            <th className="w-[15%] border border-slate-300 text-center">Total</th>
                            <th className="w-[5%] border border-slate-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billItems.map((item: IItem, ind) =>
                                <tr className="h-10" key={item.id}>
                                    <td className="border border-slate-300 text-center overflow-hidden pointer-events-none">
                                        <input type="text" value={ind + 1} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-left">
                                        <input type="text" name='items' value={item.itemName} className="w-full whitespace-nowrap bg-white pl-3" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">
                                        <input type="text" name='prices' value={item.price} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">
                                        <input type="text" name='quantites' value={item.quantity} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">{( (item.price ? item.price: 0)  * (item.quantity ? item.quantity : 0 )).toFixed(3)}</td>
                                    <td className="border border-slate-300 text-center">
                                        <span className="flex justify-center text-red-700" onClick={() => onDltClk(item)}>{delBtn}</span>
                                    </td>
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
                            <th className="border border-slate-300 text-center" >
                                <input type="text" name='amount' value={(totalAmount + gst).toFixed(3)} className="w-full whitespace-nowrap bg-slate-100 text-center" readOnly />
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-row-reverse w-[80%] mt-5">
                    <input type="submit" value="Checkout" className="bg-lime-600 hover:bg-lime-700 active:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-100 rounded-full border p-2 text-white w-28 ml-3" />
                    <select name="mode">
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
            </div>
        </Form>
    )
}