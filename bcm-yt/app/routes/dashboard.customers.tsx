import { Link, useNavigate, useLoaderData, Form, useActionData } from '@remix-run/react'
import { del, pencil } from '../icons'

import { AppDialog } from '~/dialog'
import { ChangeEvent, useEffect, useState } from 'react'

import { ActionFunctionArgs, json } from '@remix-run/node'

import { CustomerRepository } from '../repository/customer-repository'
import { ICustomer } from '~/domain/cutomer-domain'

const customerRepository = new CustomerRepository()

export async function action({ request } : ActionFunctionArgs) {
   
    const fd = await request.formData()

    const mobile = String(fd.get('mobile'))

    console.log(`Action Called ${mobile}`)

    const dltCnt = await customerRepository.delete(mobile)
    
    if(dltCnt) return json({ isDeleted : true })
    return json({ isDeleted : false })
}

export async function loader() {
    // db query
    const customers = await customerRepository.customers()
    return json(customers)
}

export default function Customers() {

    const customers = useLoaderData<typeof loader>()

    const ac = useActionData<typeof action>()

    const [filtered, setFiltered] = useState<ICustomer[]>(customers)

    const [serachMobile, setSearchMobile] = useState<string>('')

    const [isDlgVs, setDlgVs] = useState<boolean>(false)

    const [dltMbl, setDltMbl] = useState<string>('')

    const onIpCh = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if ((name === 'mobile') && isNaN(Number(value))) return;
        setSearchMobile(value)
    }

    useEffect(() => {
        const flt = customers.filter(({ mobile }: ICustomer) => serachMobile ? mobile.includes(serachMobile) : true)
        setFiltered(flt)

    }, [serachMobile])

    useEffect(() =>{
        setFiltered(customers)
    }, [customers])

    useEffect(() => {
        setDlgVs(false)
    }, [ac])

    const navigate = useNavigate()

    const onEdit = (mobile: string) => {
        navigate(`../editcustomer/${mobile}`)
    }

    const onDelete = (mobile : string) => {
        setDlgVs(true)
        setDltMbl(mobile)
    }

    const onDlgOk = async () => {
        // customerRepository.delete('98888889') // this incorrect
        setDlgVs(false)
    }

    return (
        <section className="container h-[100%]">

            { isDlgVs && (
                <AppDialog
                    onOk={onDlgOk}
                    onClose={() => setDlgVs(false)}
                    msg={`Do want to Delete ?`}
                    ttl={'Confirmation'}
                    mobile={dltMbl}
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
                                            <span className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-800' onClick={() => onDelete(mobile)}>{del}</span>
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