import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

// import { Customer } from "~/domain/customer";

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = form.get('name')
    const mobile = form.get('mobile')
    const dt = form.get('dob')

    if (
        typeof name !== "string" ||
        typeof mobile !== "string" ||
        typeof dt !== 'string'
    ) {
        throw new Error("Form not submitted correctly.");
    }

    const dob = new Date(dt)

    // const cust = new Customer({
    //     name, mobile, dob
    // })

    // cust.save()

    return redirect(`../customers`)
}

export default function NewCustomer() {
    return (
        <section className="container">
            <div className="mt-5">
                <h1 className="text-3xl"> New Customer </h1>
            </div>

            <div className="w-1/4 bg-white shadow-lg p-5 mt-5">
                <div className="flex flex-col mt-5">
                    <Form method="post" className="grid grid-cols-2 gap-4">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="bg-slate-200" />

                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name="mobile" id="mobile" className="bg-slate-200" />

                        <label htmlFor="mobile">Email</label>
                        <input type="email" name="email" id="email" className="bg-slate-200" />

                        <label htmlFor="dob">Dob</label>
                        <input type="date" name="dob" id="dob" className="bg-slate-200" />

                        <div className="flex justify-end">
                            <input type="submit" value="Okay" className="bg-lime-600 rounded-full border p-2 text-white w-20" />
                        </div>

                    </Form>
                </div>
            </div>
        </section>
    )
}