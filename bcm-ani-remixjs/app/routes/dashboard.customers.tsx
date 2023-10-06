import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";

import { newCustomer, edit, delBtn } from "../icons"
import { ChangeEvent, useEffect, useState } from "react";
import { AppDialog, DialogDetails } from "~/dialog";

import { CustomerRepository } from '../repository/customer-repository'
import { ICustomer } from '../domain/customer-domain'

const customerRepository = new CustomerRepository()

export async function loader() {
    return json((await customerRepository.customers()))
}

export default function Customers() {

    const navigate = useNavigate()

    const customers = useLoaderData<typeof loader>().map( cust => ({ ...cust, dob: new Date(cust.dob) }))

    const [searchTerm, setSearchTerm] = useState<string|undefined>(undefined)

    const [filtered, setFiltered] = useState<Array<ICustomer>>(customers)

    const [dlgDtls, setDlgDtls] = useState<DialogDetails>({ isVs: undefined, msg : undefined, ttl: undefined })

    const onIpChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSearchTerm(value)
    }

    useEffect(() => {
        const flt = customers.filter( ({ mobile }) => searchTerm ? mobile.includes(searchTerm) : true )
        setFiltered(flt)
    }, [searchTerm])

    const onEdtClk = (mobile ?: string) => {
        navigate(`../editcustomer/${mobile}`)
    }

    const onDltClk = (mobile ?: string) => {
       setDlgDtls({ isVs : true, ttl: 'Confirmation' , msg :`Do you want to delete ${mobile} ?`  })
    }

    return (
        <section className="container w-screen h-screen">
            { 
                dlgDtls.isVs && ( 
                            <AppDialog
                                onOk={ () => setDlgDtls({ isVs :false, msg: undefined, ttl: undefined }) } 
                                onClose={ () => setDlgDtls({ isVs :false, msg: undefined, ttl: undefined }) }
                               {...dlgDtls}
                            />
                        ) 
            }
                                
                
            <div className="flex justify-between items-center w-[80%] mt-5">
                <h1 className="text-3xl mx-3 w-[20%]"> Customers </h1>
                <div className="flex items-center justify-between w-[30%]">
                    <Link className="flex bg-lime-600 hover:bg-lime-700 active:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-100 rounded-full p-2 px-5 text-white" to={'../newcustomer'}> <span>{newCustomer}</span><span className="ml-1">Add</span></Link>
                    <input type="text" name='serachTerm' placeholder="Search" className="bg-slate-200 h-10 p-3" onChange={onIpChange} value={searchTerm}/>
                </div>
            </div>

            <div className="mt-5">
                <table className="table-fixed border-collapse border border-slate-400 w-[80%] bg-white shadow-lg">
                    <thead>
                        <tr className="bg-slate-100 h-10">
                            <th className="border border-slate-300 w-[5%]">Sr</th>
                            <th className="border border-slate-300 text-left w-[20%]"><span className="ml-3">Mobile</span></th>
                            <th className="border border-slate-300 text-left w-[25%]"><span className="ml-3">Name</span></th>
                            <th className="border border-slate-300 text-left w-[25%]"><span className="ml-3">Email</span></th>
                            <th className="border border-slate-300 text-center">Dob</th>
                            <th className="border border-slate-300 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.map(({ name, mobile, email, dob }, sr) => (
                                <tr className="h-10">
                                    <td className="border border-slate-300 text-center">{sr+1}</td>
                                    <td className="border border-slate-300 text-left"><Link to={`../customerdetails/${mobile}`}><u className="ml-3">{mobile}</u></Link></td>
                                    <td className="border border-slate-300 text-left"><span className="ml-3">{name}</span></td>
                                    <td className="border border-slate-300 text-left"><span className="ml-3">{email}</span></td>
                                    <td className="border border-slate-300 text-center">{dob?.toISOString().split('T')[0]}</td>
                                    <td className="border border-slate-300 text-center">
                                        <span className="flex items-center justify-center">
                                            <span className="text-blue-600 hover:bg-gray-300 active:text-blue-800 cursor-pointer" onClick={() => onEdtClk(mobile)}>{edit}</span>
                                            <span className="ml-2 text-red-600 hover:bg-gray-300 active:text-red-800 cursor-pointer" onClick={ () => onDltClk(mobile)}>{delBtn}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
        </section>
    )
}