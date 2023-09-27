
export interface DialogDetails {
    isVs ?: boolean | undefined;
    msg : string | undefined;
    ttl: string | undefined
}
interface ButtonListener {
    onOk: () => void;
    onClose: () => void
}

interface AppDialogProps extends ButtonListener, DialogDetails { }

export function AppDialog({ onOk, onClose, msg, ttl } : AppDialogProps) {
    return (
        <>
            <div className="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60 ease-linear transition-all duration-300"></div>

            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg ease-linear transition-all duration-150">
                <h1 className="text-2xl font-semibold text-red-600">{ttl}</h1>
                <div className="py-5 border-t border-b border-gray-300 text-blue-700">
                    <p>{msg}</p>
                </div>
                <div className="flex justify-end">
                    <input type='button' value='Close' className="text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600  px-4 py-2 rounded-full outline-none focus:outline-none ease-linear transition-all duration-300" onClick={onOk}/>
                    <input type='button' value='Okay' className="text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white active:bg-indigo-600  px-4 py-2 rounded-full outline-none focus:outline-none ml-3 ease-linear transition-all duration-300" onClick={onClose}/>
                </div>
            </div>
        </>

    )
}