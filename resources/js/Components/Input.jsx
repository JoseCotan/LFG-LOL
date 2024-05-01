export default function Input({ type = 'text', className = '', error = '', ...props }) {
    return (
        <div>
            <input type={type} className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`} {...props} />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
