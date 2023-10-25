import { Link, useNavigate, useLoaderData } from '@remix-run/react'
import { del, pencil } from '../icons'

import { AppDialog } from '~/dialog'
import { ChangeEvent, useEffect, useState } from 'react'

import { json } from '@remix-run/node'

import { ICustomerRepository, CustomerRepository} from '../repository/customer-repository'
import { ICustomer } from '~/domain/cutomer-domain'

const customerRepository = new CustomerRepository()

export async function loader() {
    // db query
    const customers = await customerRepository.customers()
    console.log(customers)
    return json(customers)
}

export default function Customers() {

    const customers = useLoaderData<typeof loader>()

    const [filtered, setFiltered] = useState<ICustomer[]>(customers)

    const [serachMobile, setSearchMobile] = useState<string>('')

    const [isDlgVs, setDlgVs] = useState<boolean>(false)

    const onIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if ((name === 'mobile') && isNaN(Number(value))) return;
        setSearchMobile(value)
    }

    useEffect(() => {
        const flt = customers.filter(({ mobile }: ICustomer) => serachMobile ? mobile.includes(serachMobile) : true)
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
                                    <td className='border border-slate-300 text-center'>{new Date(dob).toISOString().split('T')[0]}</td>
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