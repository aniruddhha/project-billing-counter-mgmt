import { delBtn } from "../icons"

export default function NewCustomer() {
    return (
        <section className="container flex flex-col w-screen h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> New Bill </h1>
            </div>

            <div className="flex justify-between items-end w-[80%] h-[13%] bg-white shadow-lg mt-5 p-3">
                <div className="flex w-[33%] items-end justify-between p-3">
                    <div className="flex flex-col">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" id="mobile" className="h-10 p-2 bg-slate-200" placeholder="Mobile" />
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
                        <input type="text" id="item" className="h-10 p-2 bg-slate-200" placeholder="Item" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" className="h-10 p-2 bg-slate-200" placeholder="Price" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" id="Quantity" className="h-10 p-2 bg-slate-200" placeholder="Quantity" />
                    </div>
                    <div>
                        <input type="button" value="Add" className="bg-lime-600 rounded-full border p-2 text-white w-20" />
                    </div>
                </div>
            </div>

            <div className="w-[100%] mt-5">
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
                        <tr className="h-10">
                            <td className="border border-slate-300 text-center">1</td>
                            <td className="border border-slate-300 text-left"><span className="ml-3">item1</span></td>
                            <td className="border border-slate-300 text-center">900</td>
                            <td className="border border-slate-300 text-center">30</td>
                            <td className="border border-slate-300 text-center">27000</td>
                            <td className="border border-slate-300 text-center"><span className="flex justify-center text-red-700">{delBtn}</span></td>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">Total</span>
                            </th>
                            <th className="border border-slate-300 text-center " >27000</th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">GST</span>
                            </th>
                            <th className="border border-slate-300 text-center" >890</th>
                        </tr>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 text-right" colSpan={4}>
                                <span className="mr-3">Grand Total</span>
                            </th>
                            <th className="border border-slate-300 text-center" >1890</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row-reverse w-[80%] mt-5">

                <input type="button" value="Checkout" className="bg-lime-600 rounded-full border p-2 text-white w-28 ml-3" />
                <select name="" id="" >
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                </select>
            </div>
        </section>
    )
}