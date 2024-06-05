import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full border-gray-300 bg-gray-900 text-white focus:border-sky-500 focus:ring-indigo-500 rounded-md shadow-sm text-xl ' +
                className
            }
            ref={input}
        />
    );
});
