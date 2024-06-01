export default function Button({ className = '', disabled, disliked, children, ...props }) {
    return (
        <button
            {...props}
            className={`rounded-lg px-1 py-1 ml-2 hover:bg-red-300 focus:ring-4 focus:ring-red-300 ${disliked ? 'bg-red-100 hover:bg-red-300 focus:ring-4 focus:ring-red-300' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
            <img src="/images/Dislike_Emote.webp" alt="Dislike Emote" className="w-20 h-20 " />
        </button>
    );
}
