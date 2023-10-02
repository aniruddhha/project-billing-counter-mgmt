import { logout } from './icons'


const currentDate = () => {
    const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

return formattedDate
}

export function AppNav() {
    return (
        <nav className="flex items-center justify-between h-[5%] bg-cyan-600 text-white">
            <a href="#" className="text-xl font-bold mx-3">Billing Counter Management</a>
            <ul className="flex items-center w-1/6 justify-end mx-3">
                <li><span className="text-sm text-white mx-3"><u>{currentDate()}</u></span></li>
                <li><a href="../" className="text-sm text-white hover:text-gray-700">{logout}</a></li>
            </ul>
        </nav>
    )
}