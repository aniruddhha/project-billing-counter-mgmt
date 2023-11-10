import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "react-router";
import { validateFields } from '../user.validations'

import { AppUserRepository } from '../repository/app-user-repository'

const repository = new AppUserRepository()

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action( { request } : ActionFunctionArgs) {
  
  const fd = await request.formData()

  const email = String(fd.get('email'))
  const password = String(fd.get('password'))

  const err = validateFields(email, password)

  if(!err.email.isValid || !err.password.isValid) {
    return json({ valErr : err })
  }

  //db check
  const user = await repository.login({ email, password })
  if(user) {
    return redirect('./dashboard')
  }

  return json({ err : { msg: 'Bad Creds', isValid : false } })
}

export default function Index() {

  const ac = useActionData<typeof action>()
  const { valErr } = ac || {}
  const { err } = ac || {}
 
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen h-screen">

      <h3 className="text-4xl font-bold text-center"> Login </h3>
      <h5 className="text-gray-400"> Sign In to Continue </h5>
      { err && <div className="bg-red-400 w-[15%] h-[4%] p-3 m-5 text-white flex justify-center items-center"> {err?.msg}</div> }
      <Form method="post" className="px-8 py-8 mt-4 bg-white shadow-lg"> 
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-gray-500">Email</label>
          <input type="email" name="email" id="email" className="w-full px-4 py-2 border"/>
          <span className={valErr?.email.isValid ? 'text-lime-600' : 'text-red-400'}>{valErr?.email.msg}</span>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="text-gray-500">Password</label>
          <input type="password" name="password" id="password" className="w-full px-4 py-2 border"/>
          <span className={valErr?.password.isValid ? 'text-lime-600' : 'text-red-400'}>{valErr?.password.msg}</span>
        </div>
        <div className="mt-4"> 
          <input type="submit"  value='Login' className="w-full px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-md"/>
        </div>
      </Form>
    </div>
  );
}
