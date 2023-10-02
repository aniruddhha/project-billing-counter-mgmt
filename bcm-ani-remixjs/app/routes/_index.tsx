import { ActionFunctionArgs, MetaFunction , redirect} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  console.log('called')
  return redirect('/dashboard')
}

export default function Index() {

  const acDt = useActionData<typeof action>();

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h3 className="text-2xl font-bold text-center">Login</h3>
      <h5 className="text-1xl text-gray-400">Sign In to Continue</h5>
      <div className="px-8 py-8 mt-4 text-left bg-white shadow-lg">
        <Form method="post">
          <div className="mt-4">
            <label htmlFor="userName" className="block text-gray-400">Username</label>
            <input type="text" name="userName" id="userName" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-gray-400" htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              id="password"
              name="password"
            />
          </div>
          <div className="mt-4">
            <input 
              type="submit" 
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md" 
              value='Login'/>
          </div>
        </Form>
      </div>
    </div>
  );
}
