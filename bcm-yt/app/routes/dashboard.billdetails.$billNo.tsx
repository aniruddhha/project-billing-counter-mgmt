import { Link } from '@remix-run/react'

export default function BillDeatils() {
    return (
        <section className="container h-[100%]">
            <div className="ml-5 mt-5">
                <h1 className="text-4xl">Bill Details </h1>
            </div>

            <div className="flex w-[80%] justify-between ml-5 mt-5">
                <div className="flex flex-col w-[20%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Bill #:</span>
                        <span>BILL-001</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Mobile:</span>
                        <span>
                            <Link to={`../customerdetails/${9089786756}`}><u>9089786756</u></Link>
                        </span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Mode:</span>
                        <span>UPI</span>
                    </div>
                </div>
                <div className="flex flex-col w-[20%] items-end bg-slate-100 shadow-lg p-3">
                    <div className="flex justify-between w-full">
                        <span>Date:</span>
                        <span>2020-01-01</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Cashier:</span>
                        <span>Admin</span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Counter:</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
            <hr className="m-5 w-[80%]"/>

            <div className='mt-5 ml-5 w-[80%]'>
                <table className='table-fixed w-[100%] shadow-lg bg-white'>
                    <thead>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[30%] text-left'><span className='ml-3'>Item</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Price</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Quantity</span></th>
                            <th className='border border-slate-300  w-[20%]'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>Pen</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>2</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>100</span></td>
                            <td className='border border-slate-300 text-center'>200</td>
                            
                        </tr>
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>Pen</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>2</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>100</span></td>
                            <td className='border border-slate-300 text-center'>200</td>
                           
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