import { useNavigate } from '@remix-run/react'
import { logout } from './icons'

export function AppNav() {

    const navigate = useNavigate()

    const onLogout = () => {
        console.log('Logout Clicekd')
        navigate('/')
    }

    return (
        <nav className='flex items-center justify-between w-screen h-[5%] bg-cyan-600 text-white'>
            <a className='text-xl mx-4'> Billing Counter Management </a>

            <div className='flex items-center justify-around w-[15%]' >
                <label className='font-bold'>2023-01-01</label>
                <span onClick={onLogout}>{logout}</span>
            </div>
        </nav>
    )
}