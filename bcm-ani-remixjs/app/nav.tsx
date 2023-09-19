export function AppNav() {
    return (
        <nav className="flex items-center justify-between h-10 bg-cyan-600 text-white">
            <a href="#" className="text-xl font-bold mx-3">My Website</a>
            <ul className="flex items-center w-1/6 justify-around">
                <li><a href="#" className="text-sm text-white hover:text-gray-700">Login</a></li>
                <li><a href="#" className="text-sm text-white hover:text-gray-700">Register</a></li>
            </ul>
        </nav>
    )
}