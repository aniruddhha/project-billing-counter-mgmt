import { Link } from "@remix-run/react";

import { useState } from "react";

import {
    customer, upArrow, downArrow, newCustomer,
    bill, newBill, home
} from "./icons"

export function SideMenu() {

    const [isVsCst, setIsVsCst] = useState<boolean>()
    const [isVsBls, setIsVsBls] = useState<boolean>()
    const [h, setTransY] = useState<number>(8)

    const onMnCst = () => {
        setIsVsCst(!isVsCst)
        setIsVsBls(false)
    }

    const onMnBls = () => {
        setIsVsBls(!isVsBls)
        setIsVsCst(false)
    }

    return (
        <aside className="w-1/6 h-auto shadow-lg mt-5 bg-white">
            <ul className="list-inside list-none">
                <Link to='./'>
                    <li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center">
                        <span className="flex">
                            <span>{home}</span>
                            <span className="ml-2">Home</span>
                        </span>
                    </li>
                </Link>
                <Link to="./customers">
                    <li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center" onClick={onMnCst}>
                        <span className="flex"><span>{customer}</span> <span className="ml-2">Customers</span></span><span className=" transition-all ease-in-out">{isVsCst ? upArrow : downArrow}</span>
                    </li>
                    {
                        isVsCst && 
                        <ul className={`list-inside list-none bg-blue-100 ml-3`}>
                            <Link to={'./newcustomer'}>
                                <li className={`hover:text-white hover:bg-blue-500 border-b border-blue-300 flex p-3`}>
                                    <span>{newCustomer}</span>
                                    <span className={`ml-2`}>New Customer</span>
                                </li>
                            </Link>
                        </ul>
                    }
                </Link>

                <Link to="./bills">
                    <li className={`hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex justify-between items-center`} onClick={onMnBls}>
                        <span className="flex"><span>{bill}</span> <span className="ml-2">Bills</span></span><span>{isVsBls ? upArrow : downArrow}</span>
                    </li>
                    {isVsBls &&
                        <ul className="list-inside list-none bg-blue-100 ml-3">
                            <Link to={'./newbill'}><li className="hover:text-white hover:bg-blue-500 p-3 border-b border-blue-300 flex"><span>{newBill}</span><span className="ml-2">New Bill</span> </li></Link>
                        </ul>
                    }
                </Link>
            </ul>
        </aside>
    )
}