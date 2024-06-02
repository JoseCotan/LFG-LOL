export default function Button({ className = '', disabled, liked, children, ...props }) {
    return (
        <button
            {...props}
            className={`rounded-lg px-1 py-1 ml-2 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300' ${liked ? 'bg-blue-100 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
            <img src="/images/Like_Emote.webp" alt="Like Emote" className="w-20 h-20" />
        </button>
    );
}
