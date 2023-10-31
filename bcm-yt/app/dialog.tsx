import { Form } from "@remix-run/react";

interface ButtonListener {
    onOk: () => void;
    onClose: () => void;
}

interface DialogDetails {
    msg : string
    ttl: string,
    mobile: string
}

interface AppDlgProps extends ButtonListener, DialogDetails { }

export function AppDialog({ onOk, onClose, msg, ttl, mobile } : AppDlgProps ) {
    return (
        <Form method="post">
            <div className="fixed z-40 w-screen h-screen bg-gray-900 bg-opacity-60 inset-0 ease-linear transition-all duration-300"></div>

            <div className="fixed z-50 top-[40%] left-[40%] w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg ease-linear transition-all duration-500">
                <h1 className="text-2xl font-semibold text-red-600">{ttl}</h1>

                <div className="pt-5 border-t  border-gray-300 text-blue-700">{msg}</div>
                <input type="text" name='mobile' value={mobile}  readOnly />
                <div className="pt-3 border-b  border-gray-300"></div>

                <div className="flex justify-end">
                    {/* <input type="submit" value="Okay" className="px-4 py-2 text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-full" onClick={onOk}/>  */}
                    <button type="submit" className="px-4 py-2 text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-full">Okay</button>
                    <input type="button" value="Close" className="px-4 py-2 ml-3 text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 rounded-full" onClick={onClose} />
                </div>
            </div>
        </Form>
    )
}