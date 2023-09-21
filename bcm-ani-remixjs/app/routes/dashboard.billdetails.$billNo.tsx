export default function BillDetails() {
    return (
        <section className="container flex flex-col w-screen h-screen">
            <div className="mt-5">
                <h1 className="text-3xl"> Bill Details </h1>
            </div>

            <div className="flex justify-between items-end w-[80%] h-[12%] bg-white shadow-lg mt-5 p-3">

                <div className="flex flex-col items-end w-[18%]">
                    <p className="flex justify-between w-full">
                        <span>BILL #: </span><span>2023-01-01</span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>MOBILE:</span> <span><u>9003445</u></span>
                    </p>
                    <p className="flex justify-between w-full">
                        <span>PAYMENT</span> <span>CARD</span>
                    </p>
                </div>

                <div className="flex flex-col mr-3 items-end w-[18%]">
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

                          
            <div className="w-[100%] mt-5">
                <table className="table-fixed border-collapse border border-slate-300 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className=" bg-slate-100 h-10">
                            <th className="w-[5%] border border-slate-300">Sr</th>
                            <th className="w-[20%] border border-slate-300 text-left"><span className="ml-3">Item</span></th>
                            <th className="w-[15%] border border-slate-300 text-center">Price</th>
                            <th className="w-[15%] border border-slate-300 text-center">Quantity</th>
                            <th className="w-[15%] border border-slate-300 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10">
                            <td className="border border-slate-300 text-center">1</td>
                            <td className="border border-slate-300 text-left"><span className="ml-3">item1</span></td>
                            <td className="border border-slate-300 text-center">900</td>
                            <td className="border border-slate-300 text-center">30</td>
                            <td className="border border-slate-300 text-center">27000</td>
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
        </section>
    )
}