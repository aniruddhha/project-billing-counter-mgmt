export default function NewCustomer() {
    return (
        <section className="container h-[100%]">
            <div className="ml-5 mt-5">
                <h1 className="text-4xl"> New Customer </h1>
            </div>
            <div className="w-[30%] ml-5 shadow-lg p-5 bg-slate-100 mt-5">
                <form>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="mobile" className="text-gray-500">Mobile</label>
                        <input type="text" id="mobile" className="px-4 py-2 border" placeholder="Mobile" />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="name" className="text-gray-500">Name</label>
                        <input type="text" id="name" className="px-4 py-2 border" placeholder="Name" />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="email" className="text-gray-500">Email</label>
                        <input type="email" id="email" className="px-4 py-2 border" placeholder="Email" />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="dob" className="text-gray-500">Dob</label>
                        <input type="date" id="dob" className="px-4 py-2 border" placeholder="Dob" />
                    </div>
                    <div className="flex justify-center mt-3">
                        <input type="submit" value="Create" className="bg-lime-600 p-2 text-white w-20 hover:bg-lime-700 active:bg-lime-800 rounded-full" />
                    </div>
                </form>
            </div>

        </section>
    )
}