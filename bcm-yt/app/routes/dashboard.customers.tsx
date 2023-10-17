import { Link, useNavigate } from '@remix-run/react'
import { del, pencil } from '../icons'

import { AppDialog } from '~/dialog'
import { ChangeEvent, useEffect, useState } from 'react'
import { ICustomer } from '~/domain/cutomer-domain'

export default function Customers() {

    const [customers, setCustomers] = useState<ICustomer[]>([
        {
            "name": "John Doe",
            "mobile": "1234567890",
            "email": "johndoe@example.com",
            "dob": "1990-01-01"
        },
        {
            "name": "Jane Smith",
            "mobile": "2345678901",
            "email": "janesmith@example.com",
            "dob": "1990-02-02"
        },
        {
            "name": "David Johnson",
            "mobile": "3456789012",
            "email": "davidjohnson@example.com",
            "dob": "1990-03-03"
        },
        {
            "name": "Alice Davis",
            "mobile": "4567890123",
            "email": "alicedavis@example.com",
            "dob": "1990-04-04"
        },
        {
            "name": "Bob Wilson",
            "mobile": "5678901234",
            "email": "bobwilson@example.com",
            "dob": "1990-05-05"
        },
        {
            "name": "Ella Martinez",
            "mobile": "6789012345",
            "email": "ellamartinez@example.com",
            "dob": "1990-06-06"
        },
        {
            "name": "Mike Brown",
            "mobile": "7890123456",
            "email": "mikebrown@example.com",
            "dob": "1990-07-07"
        },
        {
            "name": "Sophia Lee",
            "mobile": "8901234567",
            "email": "sophialee@example.com",
            "dob": "1990-08-08"
        },
        {
            "name": "Oliver Taylor",
            "mobile": "9012345678",
            "email": "olivertaylor@example.com",
            "dob": "1990-09-09"
        },
        {
            "name": "Mia Miller",
            "mobile": "0123456789",
            "email": "miamiller@example.com",
            "dob": "1990-10-10"
        },
        {
            "name": "William Wilson",
            "mobile": "1023456789",
            "email": "williamwilson@example.com",
            "dob": "1991-11-11"
        },
        {
            "name": "Linda Johnson",
            "mobile": "1123456789",
            "email": "lindajohnson@example.com",
            "dob": "1992-12-12"
        },
        {
            "name": "Michael Miller",
            "mobile": "1223456789",
            "email": "michaelmiller@example.com",
            "dob": "1993-01-13"
        },
        {
            "name": "Barbara Taylor",
            "mobile": "1323456789",
            "email": "barbarataylor@example.com",
            "dob": "1994-02-14"
        },
        {
            "name": "David Smith",
            "mobile": "1423456789",
            "email": "davidsmith@example.com",
            "dob": "1995-03-15"
        },
        {
            "name": "Sarah Wilson",
            "mobile": "1523456789",
            "email": "sarahwilson@example.com",
            "dob": "1996-04-16"
        },
        {
            "name": "Robert Johnson",
            "mobile": "1623456789",
            "email": "robertjohnson@example.com",
            "dob": "1997-05-17"
        },
        {
            "name": "Karen Miller",
            "mobile": "1723456789",
            "email": "karenmiller@example.com",
            "dob": "1998-06-18"
        },
        {
            "name": "James Taylor",
            "mobile": "1823456789",
            "email": "jamestaylor@example.com",
            "dob": "1999-07-19"
        },
        {
            "name": "Susan Johnson",
            "mobile": "1923456789",
            "email": "susanjohnson@example.com",
            "dob": "2000-08-20"
        }
    ]
    )

    const [filtered, setFiltered] = useState<ICustomer[]>(customers)

    const [serachMobile, setSearchMobile] = useState<string>('')

    const [isDlgVs, setDlgVs] = useState<boolean>(false)

    const onIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (( name === 'mobile') && isNaN(Number(value))) return;
        setSearchMobile(value)
    }

    useEffect(() =>{

        const flt = customers.filter( ( { mobile } : ICustomer ) => serachMobile ? mobile.includes(serachMobile) : true  )
        setFiltered(flt)

    }, [serachMobile])


    const navigate = useNavigate()

    const onEdit = (mobile: string) => {
        navigate(`../editcustomer/${mobile}`)
    }

    const onDelete = () => {
        setDlgVs(true)
    }

    return (
        <section className="container h-[100%]">

            {isDlgVs && (
                <AppDialog
                    onOk={() => setDlgVs(false)}
                    onClose={() => setDlgVs(false)}
                    msg='Do want to Delete ?'
                    ttl='Confirmation'
                />
            )
            }

            <div className="w-[80%] flex justify-between items-center mt-5 ml-5">
                <h1 className="text-4xl">Customers</h1>
                <div>
                    <span><Link to='../newcustomer'><u>New</u></Link></span>
                    <input type="text" name='mobile' className="ml-3 bg-slate-100 h-8 p-2 border" placeholder='Mobile' onChange={onIpCh} value={serachMobile} />
                </div>
            </div>
            <div className='mt-5 ml-5 w-[80%]'>
                <table className='table-fixed w-[100%] shadow-lg bg-white'>
                    <thead>
                        <tr className='h-10 bg-slate-100'>
                            <th className='border border-slate-300 w-[5%]'>Sr</th>
                            <th className='border border-slate-300 w-[20%] text-left'><span className='ml-3'>Mobile</span></th>
                            <th className='border border-slate-300 w-[25%] text-left ml-3'><span className='ml-3'>Name</span></th>
                            <th className='border border-slate-300 w-[25%] text-left ml-3'><span className='ml-3'>Email</span></th>
                            <th className='border border-slate-300'>Dob</th>
                            <th className='border border-slate-300'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filtered.map(({ mobile, name, email, dob }: ICustomer, ind) => (
                                <tr className='h-10'>
                                    <td className='border border-slate-300 text-center'>{ind + 1}</td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'><Link to={`../customerdetails/${mobile}`}><u>{mobile}</u></Link></span></td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'>{name}</span></td>
                                    <td className='border border-slate-300 ml-3'><span className='ml-3'>{email}</span></td>
                                    <td className='border border-slate-300 text-center'>{dob}</td>
                                    <td className='border border-slate-300 text-center'>
                                        <div className='flex justify-around items-center'>
                                            <span className='text-blue-400 cursor-pointer hover:text-blue-600 active:text-blue-800' onClick={() => onEdit(mobile)}>{pencil}</span>
                                            <span className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-800' onClick={() => onDelete()}>{del}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}