import { ChangeEvent, useEffect, useState } from "react"
import { delBtn } from "../icons"
import { v4 as uuidv4 } from 'uuid';
import { Form, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { warning } from '../icons'

interface BillItem {
    id: string;
    itemName: string;
    price: number;
    quantity: number;
}

interface IpError {
    item: { isInitial: boolean, msg: string, isValid: boolean };
    price: { isInitial: boolean, msg: string, isValid: boolean };
    quantity: { isInitial: boolean, msg: string, isValid: boolean };
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const items = form.getAll('item');
    const prices = form.getAll('price').map(Number);
    const quantities = form.getAll('quantity').map(Number);
    const mode = String(form.get('mode'))

    if (items.length == 0 && prices.length == 0 && quantities.length == 0) {

        return json({ msg: 'Invalid Form', isFormValid : false })
    }

    const raw = { items, prices, quantities }

    const processed = items.map((item, index) => ({
        'item': item,
        'price': prices[index],
        'quantity': quantities[index]
    }))

    const fineObj = { items: [...processed], mode }

    return redirect('../bills')
}


export default function NewCustomer() {

    const [billItems, setBillItems] = useState<BillItem[]>([])

    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [gst, setGst] = useState<number>(0)

    const [billItem, setBillItem] = useState<BillItem>({
        id: '',
        itemName: '',
        price: 0,
        quantity: 0
    })

    const [errors, setErrors] = useState<IpError>({
        item: { isInitial: true, msg: 'Mandetory', isValid: false },
        price: { isInitial: true, msg: 'Non zero Non negative', isValid: false },
        quantity: { isInitial: true, msg: 'Non zero Non negative', isValid: false }
    })

    useEffect(() => {

        const ttl = billItems.reduce((accumulator, item) => {
            return accumulator + (item.price * item.quantity);
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

    const onDltClk = (item: BillItem) => {
        const updatedBillItems = billItems.filter(it => it.id != item.id)
        setBillItems(updatedBillItems)
    }

    const onAddClk = () => validateItems()

    const validateItems = () => {

        if (billItem.itemName === '' || billItem.itemName.trim() === '') {
            setErrors(old => ({
                ...old, item: { isInitial: false, msg: 'Need Proper Item Name', isValid: false }
            }))
        }
        else {
            console.log('valid item name')
            const isAdded = billItems.some(it => it.itemName === billItem.itemName)
            console.log(isAdded)
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
        if (billItem.price <= 0) {
            setErrors(old => ({
                ...old, price: { isInitial: false, msg: 'Price Must Be Positive', isValid: false }
            }))
        } else {
            setErrors(old => ({
                ...old, price: { isInitial: false, msg: 'Price Okay', isValid: true }
            }))
        }
        if (billItem.quantity <= 0) {
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
        if ((name === "price" || name === "quantity") && isNaN(Number(value))) return;

        setBillItem(old => ({ ...old, id: uuidv4(), [name]: value }))
    }

    const actionData = useActionData<typeof action>();

    return (
        <section className="container flex flex-col w-screen h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> New Bill </h1>
            </div>

            <div className="flex justify-between items-end w-[80%] h-[13%] bg-white shadow-lg mt-5 p-3">
                <div className="flex w-[33%] items-end justify-between p-3">
                    <div className="flex flex-col">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name="mobile" id="mobile" className="h-10 p-2 bg-slate-200" placeholder="Mobile" />
                    </div>
                    <input type="button" value="Search" className="border bg-blue-500 text-white w-20 h-10" />
                </div>
                <div className="flex flex-col mr-3 items-end w-[13%]">
                    <p className="flex justify-between w-full">
                        <span>Date: </span><span>2023-01-01</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>Cashier:</span> <span>Abc</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>Counter:</span> <span>01</span>
                    </p>
                </div>
            </div>

            <div className="flex w-[60%] h-[13%] bg-white shadow-lg mt-5 items-center">
                <div className="flex justify-between items-end w-full h-20 p-5 mt-5">
                    <div className="flex flex-col">
                        <label htmlFor="item">Item</label>
                        <input type="text" id="itemName" name="itemName" className="h-10 p-2 bg-slate-200" placeholder="Item" value={billItem.itemName} onChange={onIpChange} />
                        <label className={`${(errors.item.isInitial || errors.item.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.item.msg}</label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" className="h-10 p-2 bg-slate-200" placeholder="Price" value={billItem?.price} onChange={onIpChange} />
                        <label className={`${(errors.price.isInitial || errors.price.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.price.msg}</label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" id="Quantity" name="quantity" className="h-10 p-2 bg-slate-200" placeholder="Quantity" value={billItem?.quantity} onChange={onIpChange} />
                        <label className={`${(errors.quantity.isInitial || errors.quantity.isValid) ? 'text-lime-600' : 'text-red-400'} text-[0.6rem]`}>{errors.quantity.msg}</label>
                    </div>
                    <div>
                        <input type="submit" value="Add" className="bg-lime-600  hover:bg-lime-700 active:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-100 rounded-full border p-2 text-white w-20 mb-5" onClick={onAddClk} />
                    </div>
                </div>
            </div>

            <Form method="post" className="w-[100%] mt-5">

                { (actionData && (!actionData.isFormValid)) &&
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
                            billItems.map((item: BillItem, ind) =>
                                <tr className="h-10" key={item.id}>
                                    <td className="border border-slate-300 text-center overflow-hidden pointer-events-none">
                                        <input type="text" value={ind + 1} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-left">
                                        <input type="text" name='item' value={item.itemName} className="w-full whitespace-nowrap bg-white pl-3" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">
                                        <input type="text" name='price' value={item.price} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">
                                        <input type="text" name='quantity' value={item.quantity} className="w-full whitespace-nowrap bg-white text-center" readOnly />
                                    </td>
                                    <td className="border border-slate-300 text-center">{(item.price * item.quantity).toFixed(3)}</td>
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
                            <th className="border border-slate-300 text-center" >{(totalAmount + gst).toFixed(3)}</th>
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
            </Form>
        </section>
    )
}