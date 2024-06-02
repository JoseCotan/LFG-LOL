export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-xl font-bold mb-2 ${className}`}>
            {value ? value : children}
        </label>
    );
}
