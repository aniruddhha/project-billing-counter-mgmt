import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h3 className="text-4xl font-bold text-center"> Login </h3>
      <h5 className="text-gray-400"> Sign In to Continue </h5>
      <div className="px-8 py-8 mt-4 bg-white shadow-lg"> 
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-gray-500">Email</label>
          <input type="email" id="email" className="w-full px-4 py-2 border"/>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="text-gray-500">Password</label>
          <input type="password" id="password" className="w-full px-4 py-2 border"/>
        </div>
        <div className="mt-4"> 
          <input type="submit"  value='Login' className="w-full px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-md"/>
        </div>
      </div>
    </div>
  );
}
