export default function CustomerDeatils() {
    return (
        <section>
            <div className="mt-5 ml-5">
                <h1 className="text-4xl"> Customer Details </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 w-[25%] bg-slate-100 p-3 shadow-lg mt-3 ml-5">
                <label>MOBILE</label><label className="border-l border-slate-400 pl-2">9876543212</label>
                <label>NAME</label><label className="border-l border-slate-400 pl-2">Abc</label>
                <label>EMAIL</label><label className="border-l border-slate-400 pl-2">abc@ff.com</label>
                <label>DOB</label><label className="border-l border-slate-400 pl-2">2000-01-01</label>
            </div>
            <div className="mt-5 ml-5">
                <label className="text-slate-400">Recent Transactions</label>
            </div>
            <div className='mt-5 ml-5 w-[80%]'>
                <table className='table-fixed w-[100%] shadow-lg bg-white'>
                    <thead>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[30%] text-left'><span className='ml-3'>Bill</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Date</span></th>
                            <th className='border border-slate-300 w-[20%] ml-3'><span className='ml-3'>Amount</span></th>
                            <th className='border border-slate-300'>Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='h-10'>
                            <td className='border border-slate-300 text-center'>1</td>
                            <td className='border border-slate-300 ml-3'><span className='ml-3'>BILL001</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>2020-01-01</span></td>
                            <td className='border border-slate-300 ml-3 text-center'><span className='ml-3'>300</span></td>
                            <td className='border border-slate-300 text-center'>UPI</td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    )
}