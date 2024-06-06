import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full text-lg flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-400 text-sky-500 focus:border-indigo-700 '
                    : 'border-transparent text-sky-300 hover:text-sky-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 '
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
