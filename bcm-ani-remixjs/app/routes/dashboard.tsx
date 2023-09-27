import {  Outlet } from "@remix-run/react";
import { SideMenu } from "../sidemenu"
import { AppNav } from "../nav"

export default function Dashboard() {

    return (
        <main className="w-screen h-screen">
            <AppNav/>
            <div className="flex flex-row bg-gray-100 w-[100%]">
                <SideMenu/>
                <main className="flex-1 mt-5 ml-5">
                    <Outlet />
                </main>
            </div>
        </main>
    )
}