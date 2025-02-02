import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    onTap?: () => void;
    fullRounded?: boolean;
}

export default function Button({ children, onTap, fullRounded }: ButtonProps): JSX.Element {
    const roundingType = fullRounded ? 'full' : 'lg';

    return (
        <button
            className={`p-4 rounded-${roundingType} text-slate-200 bg-slate-800 hover:bg-slate-600 cursor-pointer`}
            onClick={onTap}
        >
            {children}
        </button>
    );
}
