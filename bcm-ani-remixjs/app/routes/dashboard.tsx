import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";

import {
    customer, upArrow, downArrow, newCustomer, customerDetails,
    bill,
    analytics
} from "../icons"


export default function Dashboard() {

    const [isVs, setIsVs] = useState<boolean>()

    
    return (
        <>
            <nav className="flex items-center justify-between h-10 bg-cyan-600 text-white">
                <a href="#" className="text-xl font-bold mx-3">My Website</a>
                <ul className="flex items-center w-1/6 justify-around">
                    <li><a href="#" className="text-sm text-white hover:text-gray-700">Login</a></li>
                    <li><a href="#" className="text-sm text-white hover:text-gray-700">Register</a></li>
                </ul>
            </nav>
            <div className="flex flex-row bg-gray-100">

                <aside className="w-1/6 h-screen shadow-lg mt-5 bg-white">
                    <ul className="list-inside list-none">
                        <Link to="./customers">
                            <li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center" onClick={() => setIsVs(!isVs)}>
                                <span className="flex"><span>{customer}</span> <span className="ml-2">Customers</span></span><span>{isVs ? upArrow : downArrow}</span>
                            </li>
                            {isVs &&
                                <ul className="list-inside list-none bg-blue-100 ml-3">
                                    <Link to={'./newcustomer'}><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span>{newCustomer}</span><span className="ml-2">New Customer</span> </li></Link>
                                </ul>
                            }
                        </Link>

                        <Link to="./bill"><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span className="flex">{bill} </span><span className="ml-2">Bill</span></li></Link>
                        <Link to="./analytics"><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span className="flex">{analytics} </span><span className="ml-2">Analytics</span></li></Link>
                    </ul>
                </aside>
                <main className="flex-1 mt-5 ml-5">
                    <Outlet />
                </main>
            </div>

        </>
    )
}