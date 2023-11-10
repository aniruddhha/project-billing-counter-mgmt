import { useState } from 'react'
import { upArrow, downArrow, customer, bill, add } from './icons'

import { Link } from '@remix-run/react'

export function SideMenu() {

    const [isVsCst, setIsVsCst] = useState<boolean>(false)
    const [isVsBl, setIsVsBl] = useState<boolean>(false)

    const onMnArCst = () => {
        setIsVsCst(!isVsCst)
        setIsVsBl(false)
    }

    const onMnArBl = () => {
        setIsVsBl(!isVsBl)
        setIsVsCst(false)
    }

    return (
        <aside className="w-[15%] h-[100%] bg-white border">
            <ul className="list-inside list-none">
                <Link to='./customers'>
                    <li className="p-3 hover:bg-blue-500 hover:text-white flex justify-between border-b-2">
                        <div className='flex'>
                            <span className='text-red-700'>{customer}</span>
                            <span className='ml-2'>Customer</span>
                        </div>
                        <span onClick={onMnArCst}>{isVsCst ? upArrow : downArrow}</span>
                    </li>
                </Link>
                {isVsCst && (
                    <ul className='bg-blue-100 ml-3'>
                        <Link to='./newcustomer'>
                            <li className='p-3 hover:text-white hover:bg-blue-500 flex'>
                                <span className='text-red-700'>{add}</span>
                                <span className='ml-2'>New Customer</span>
                            </li>
                        </Link>
                    </ul>
                )
                }
                <Link to='./bills'>
                    <li className="p-3 hover:bg-blue-500 hover:text-white flex justify-between  border-b-2">
                        <div className='flex'>
                            <span className='text-red-700'>{bill}</span>
                            <span className='ml-2'>Bill</span>
                        </div>
                        <span onClick={onMnArBl}>{isVsBl ? upArrow : downArrow}</span>
                    </li>
                </Link>
                {isVsBl && (
                    <ul className='bg-blue-100 ml-3'>
                        <Link to='./newbill'>
                            <li className='p-3 hover:text-white hover:bg-blue-500 flex'>
                                <span className='text-red-700'>{add}</span>
                                <span className='ml-2'>New Bill</span>
                            </li>
                        </Link>
                    </ul>
                )
                }
            </ul>
        </aside>
    )
}