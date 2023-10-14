import { Link } from '@remix-run/react'

export default function Bills() {
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
                        <input id="customerMobile" type="text" className='h-10 p-2' placeholder='Mobile'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="billDate">Bill Date</label>
                        <input id="billDate" type="date" className='h-10 p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="counter">Counter</label>
                        <input id="counter" type="number" className='h-10 p-2' placeholder='Counter'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="cashier">Cashier</label>
                        <input id="cashier" type="text" className='h-10 p-2' placeholder='Cashier'/>
                    </div>
                    <div className='flex justify-start items-end'>
                        <input type="button" value='Search' className='w-20 h-10 text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900' />
                    </div>
                </form>
            </fieldset>

            <div className='mt-8 ml-5 w-[100%] mr-5'>
                <table className='table-fixed shadow-lg bg-white'>
                    <thead>
                        <tr className='h-1'>
                            <th className='border border-slate-300 h-20 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 h-20 w-[10%]'><input className='bg-slate-200 h-10' type="text" placeholder='Bill No'/></th>
                            <th className='border border-slate-300 h-20 w-[10%]'><input className='bg-slate-200 h-10' type="text" placeholder='Mobile' /></th>
                            <th className='border border-slate-300 h-20 w-[10%]'><input className='bg-slate-200 h-10' type="number" placeholder='Amount' /></th>
                            <th className='border border-slate-300 h-20 w-[10%]'><input className='bg-slate-200 h-10' type="date" /></th>
                            <th className='border border-slate-300 h-20 w-[10%]'><input className='bg-slate-200 h-10' type="text" placeholder='Cashier' /></th>
                            <th className='border border-slate-300 h-20 w-[5%]'><input className='bg-slate-200 h-10' type="number" placeholder='Counter' /></th>
                        </tr>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[10%] text-left'><span className='ml-3'>Bill No</span></th>
                            <th className='border border-slate-300 w-[10%] text-left ml-3'><span className='ml-3'>Mobile</span></th>
                            <th className='border border-slate-300 w-[10%] text-left ml-3'><span className='ml-3'>Amount</span></th>
                            <th className='border border-slate-300 w-[10%]'>Date</th>
                            <th className='border border-slate-300 w-[10%]'>Cashier</th>
                            <th className='border border-slate-300 w-[5%]'>Counter</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'><Link to={`../billdetails/${'bill123'}`}><u>BILL-0001</u></Link></span></td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>9876543212</span></td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>2000</span></td>
                            <td className='border border-slate-300 text-center'>2002-01-01</td>
                            <td className='border border-slate-300 text-center'>aaa</td>
                            <td className='border border-slate-300 text-center'>1</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </section>
    )
}