import { Outlet } from '@remix-run/react'

import { AppNav } from '../appnav'
import { SideMenu } from '../sidemenu'

export default function Dashboard() {
    return (
        <main className='w-screen h-screen'>
            <AppNav/>
            <section className='w-[100%] h-[100%] flex'>
                <SideMenu/>
                <main className='flex-1'>
                    <Outlet/>
                </main>
            </section>
        </main>
    )
}