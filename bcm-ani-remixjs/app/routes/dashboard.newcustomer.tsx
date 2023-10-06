import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ChangeEvent, useState } from "react";

import { CustomerRepository } from '../repository/customer-repository'
import { ICustomer } from '../domain/customer-domain'

const customerRepository = new CustomerRepository()

interface IpError {
  name: { msg: string, isValid: boolean };
  mobile: { msg: string, isValid: boolean };
  email: { msg: string, isValid: boolean };
  dob: { msg: string, isValid: boolean }
}

const validateFields = ({ name, mobile, email, dob }: ICustomer): IpError => {
  const error = {
    name: { msg: '', isValid: false },
    mobile: { msg: '', isValid: false },
    email: { msg: '', isValid: false },
    dob: { msg: '', isValid: false },
  };

  // Validate name (e.g., must not be empty)
  if (!name.trim()) {
    error.name.msg = 'Name is required';
  } else {
    error.name.msg = 'Name Okay';
    error.name.isValid = true;
  }

  // Validate mobile number (e.g., must be a valid format)
  const mobileRegex = /^[0-9]{10}$/; // Adjust this regex pattern as needed
  if (!mobile.match(mobileRegex)) {
    error.mobile.msg = 'Invalid mobile number';
  } else {
    error.mobile.msg = 'Mobile Okay';
    error.mobile.isValid = true;
  }

  // Validate email (e.g., must be a valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
  if (!email.match(emailRegex)) {
    error.email.msg = 'Invalid email address';
  } else {
    error.email.isValid = true;
    error.email.msg = 'Email Okay';
  }

  // Validate date of birth (e.g., must be a past date)
  const currentDate = new Date();
  console.log(dob)

  if (isNaN(dob.getTime())) {
    error.dob.msg = 'Invalid date format';
    error.dob.isValid = false;
  }
  else {
    if (dob >= currentDate) {
      error.dob.msg = 'Date of birth must be in the past';
      error.dob.isValid = false
    } else {
      error.dob.isValid = true;
      error.dob.msg = 'DOB Okay';
    }
  }
  return error;
};

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const name = form.get('name') as string
  const mobile = form.get('mobile') as string
  const email = form.get('email') as string
  const dt = form.get('dob') as string

  const dob = new Date(dt)

  const customer: ICustomer = { name, mobile, email, dob }

  const error = validateFields(customer)

  if (error.dob.isValid && error.email.isValid && error.mobile.isValid && error.name.isValid) {
    // const cust = new Customer({
    //     name, mobile, dob
    // })

    // cust.save()
    await customerRepository.create(customer)

    return redirect(`../customers`)
  }
  return json({ error, dob })
}

export default function NewCustomer() {

  const [mobile, setMobile] = useState('')

  const onIpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "mobile") && isNaN(Number(value))) return;
    setMobile(value)
}

  const acDt = useActionData<typeof action>();

  const { error } = acDt || {}

  return (
    <section className="container w-screen h-screen">
      <div className="mt-5">
        <h1 className="text-3xl"> New Customer </h1>
      </div>

      <div className="w-[50%] bg-white shadow-lg p-5 mt-5">
        <div className="flex flex-col mt-5">
          <Form method="post" className="grid grid-cols-2 gap-4">
            <label htmlFor="name">Name</label>
            <div className="flex flex-col">
              <input type="text" name="name" id="name" className="bg-slate-200 h-10 p-2" placeholder="Name" />
              {error && <label className={error.name.isValid ? 'text-lime-600 text-[0.6rem]' : 'text-red-400 text-[0.6rem]'}>{error.name.msg}</label>}
            </div>

            <label htmlFor="mobile">Mobile</label>
            <div className="flex flex-col">
              <input type="text" name="mobile" id="mobile" className="bg-slate-200 h-10 p-2" placeholder="Mobile" onChange={onIpChange} value={mobile}/>
              {error && <label className={error.mobile.isValid ? 'text-lime-600 text-[0.6rem]' : 'text-red-400 text-[0.6rem]'}>{error.mobile.msg}</label>}
            </div>

            <label htmlFor="mobile">Email</label>
            <div className="flex flex-col">
              <input type="email" name="email" id="email" className="bg-slate-200 h-10 p-2" placeholder="Email" />
              {error && <label className={error.email.isValid ? 'text-lime-600 text-[0.6rem]' : 'text-red-400 text-[0.6rem]'}>{error.email.msg}</label>}
            </div>

            <label htmlFor="dob">Dob</label>
            <div className="flex flex-col">
              <input type="date" name="dob" id="dob" className="bg-slate-200 h-10 p-2" />
              {error && <label className={error.dob.isValid ? 'text-lime-600 text-[0.6rem]' : 'text-red-400 text-[0.6rem]'}>{error.dob.msg}</label>}
            </div>

            <div className="flex justify-end">
              <input type="submit" value="Okay" className="bg-lime-600 hover:bg-lime-700 active:bg-lime-800 focus:outline-none focus:ring focus:ring-lime-100 rounded-full p-2 text-white w-20" />
            </div>
          </Form>
        </div>
      </div>

    </section>
  )
}