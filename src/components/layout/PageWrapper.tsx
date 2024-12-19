import {ReactNode} from "react";

export default function PageWrapper({
                                 children,
                                 className,
                             }: Readonly<{
    children: ReactNode;
    className?: string;
}>) {
    return (
        <main className={`min-h-max max-w-max bg-mainGreen text-mainWhite ${className}`}>
            {children}
        </main>
    );
}