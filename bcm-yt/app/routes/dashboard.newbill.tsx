import { del } from '../icons'

export default function NewBill() {
    return (
        <section className="container h-[100%]">
            <div className="ml-5 mt-5">
                <h1 className="text-4xl"> New bill </h1>
            </div>
            <div className="flex w-[95%] justify-between ml-5 mt-5">
                <div className="flex w-[30%] justify-start items-end">
                    <div className="flex flex-col">
                        <label htmlFor="customerMobile">Mobile</label>
                        <input type="text" id="customerMobile" placeholder="Mobile" className="bg-slate-200 h-10 p-2" />
                    </div>
                    <input type="button" value="Serach" className="w-20 h-10 ml-3 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900" />
                </div>
                <div className="flex flex-col w-[15%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Date:</span>
                        <span>2020-01-01</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Cashier:</span>
                        <span>
                            <select>
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
                            <select>
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
            <div className="flex w-[55%] ml-5">
                <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col">
                        <label htmlFor="itemName">Item</label>
                        <input type="text" id="itemName" placeholder="Item" className="bg-slate-200 h-10 p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" placeholder="Price" className="bg-slate-200 h-10 p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="quantity">Mobile</label>
                        <input type="text" id="quantity" placeholder="Quantity" className="bg-slate-200 h-10 p-2" />
                    </div>
                    <div className="flex">
                        <input type="button" value="Add" className="w-20 h-10 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900" />
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
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>Pen</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>2</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>100</span></td>
                            <td className='border border-slate-300 text-center'>200</td>
                            <td className='border border-slate-300 text-center'>
                                <div className='flex justify-center items-center'>
                                    <span className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-800'>{del}</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>Pen</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>2</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>100</span></td>
                            <td className='border border-slate-300 text-center'>200</td>
                            <td className='border border-slate-300 text-center'>
                                <div className='flex justify-center items-center'>
                                    <span className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-800'>{del}</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>Total</span>
                            </th>
                            <th className='border border-slate-300'>
                                30
                            </th>
                        </tr>
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>GST</span>
                            </th>
                            <th className='border border-slate-300'>
                                30
                            </th>
                        </tr>
                        <tr className='bg-slate-100 h-10'>
                            <th className='border border-slate-300 text-right' colSpan={4}>
                                <span className='mr-3'>Grand Total</span>
                            </th>
                            <th className='border border-slate-300'>
                                30
                            </th>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}