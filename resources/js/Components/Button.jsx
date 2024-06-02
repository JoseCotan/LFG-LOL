export default function Button({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3  ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
