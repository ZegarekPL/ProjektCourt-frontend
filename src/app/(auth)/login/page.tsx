"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputPassword, InputEmail } from "@/components/auth/Inputs";
import Message from "@/components/auth/LoingMessage";
import PageWrapper from "@/components/layout/PageWrapper";
import {LoginButton} from "@/components/auth/LoginButton";
import LoginHeader from "@/components/auth/LoginHeader";

export default function Login() {
    const [message, setMessage] = useState("");
    const [logged, setLogged] = useState<boolean | undefined>(undefined);
    const router = useRouter();
    const [showLogin, setShowLogin] = useState<boolean | undefined>(true);


    const submitLogin = async (formData: FormData) => {
        setLogged(undefined);
        const email = formData.get("email");
        const password = formData.get("password");
        const userData = { email, password };
        console.log(userData);
        const result = 200
        if (result === 200) {
            setLogged(true);
            router.push("/court");
        } else {
            setMessage(result);
            setLogged(false);
        }
        setTimeout(() => {
            setLogged(undefined);
            setShowLogin(true)
        }, 6 * 1000);
    };

    return (
        <PageWrapper className="flex justify-center items-center">
            {showLogin ? (
                <div className={`bg-mainWhite p-7 my-10 rounded shadow-md w-64 xs:w-80 lg:w-96 `}>
                    <form action={submitLogin}>
                        <LoginHeader
                            title={"Logowanie"}
                            description={
                                "Wprowadź adres e-mail oraz hasło aby uzyskać dostęp do konta."
                            }
                        />
                        <InputEmail />
                        <InputPassword />

                        <LoginButton
                            messageIfLoadingIsTrue={"Logowanie..."}
                            messageIfLoadingIsFalse={"Zaloguj"}
                        />
                        <div className="flex flex-row justify-center text-darkGray gap-x-1 pt-2 text-sm sm:text-md">
                            <p>Nie masz konta?</p>
                            <Link href={"/add-account"}>
                                <button className="text-right text-darkGray underline text-sm sm:text-md">
                                    Załóż konto
                                </button>
                            </Link>
                        </div>
                        <Message
                            value={logged}
                            messageIfIsRed={message}
                            messageIfIsGreen={"Zalogowano poprawnie"}
                        />
                    </form>
                </div>
            ) : (
                <h1 className="text-sm sm:text-md md:text-lg lg:text-2xl text-mainWhite pt-[20%]">
                    Trwa ładowanie danych...
                </h1>
            )}
        </PageWrapper>
    );
}