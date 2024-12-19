import Image from "next/image";
import Logo from "@/assets/logo/logo.webp";
import PageWrapper from "@/components/layout/PageWrapper";

export default function Error404Page() {
    return (
        <PageWrapper className="flex flex-col justify-center items-center">
            <p className="text-2xl lg:text-4xl text-darkGray">BŁĄD 404</p>
            <Image src={Logo} alt="logo" className="w-1/2 sm:w-1/4" priority />
            <p className="text-xl lg:text-3xl text-center text-darkGray px-12">
                Strona nie istnieje
            </p>
        </PageWrapper>
    );
}