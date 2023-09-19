import { Link } from "@remix-run/react";

import { useState } from "react";

import {
    customer, upArrow, downArrow, newCustomer, customerDetails,
    bill, newBill,
    analytics
} from "./icons"

export function SideMenu() {

    const [isVsCst, setIsVsCst] = useState<boolean>()
    const [isVsBls, setIsVsBls] = useState<boolean>()

    return (
        <aside className="w-1/6 h-auto shadow-lg mt-5 bg-white">
            <ul className="list-inside list-none">
                <Link to="./customers">
                    <li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center" onClick={() => setIsVsCst(!isVsCst)}>
                        <span className="flex"><span>{customer}</span> <span className="ml-2">Customers</span></span><span>{isVsCst ? upArrow : downArrow}</span>
                    </li>
                    {isVsCst &&
                        <ul className="list-inside list-none bg-blue-100 ml-3">
                            <Link to={'./newcustomer'}><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span>{newCustomer}</span><span className="ml-2">New Customer</span> </li></Link>
                        </ul>
                    }
                </Link>

                <Link to="./bills">
                    <li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center" onClick={() => setIsVsBls(!isVsBls)}>
                        <span className="flex"><span>{bill}</span> <span className="ml-2">Bills</span></span><span>{isVsBls ? upArrow : downArrow}</span>
                    </li>
                    {isVsBls &&
                        <ul className="list-inside list-none bg-blue-100 ml-3">
                            <Link to={'./newbill'}><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span>{newBill}</span><span className="ml-2">New Bill</span> </li></Link>
                        </ul>
                    }
                </Link>
                <Link to="./analytics"><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span className="flex">{analytics} </span><span className="ml-2">Analytics</span></li></Link>
            </ul>
        </aside>
    )
}