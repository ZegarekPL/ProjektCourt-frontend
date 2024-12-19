"use client";
import { LoginButton } from "@/components/auth/LoginButton";
import LoginHeader from "@/components/auth/LoginHeader";
import {
    InputBirthDate,
    InputEmail,
    InputName,
    InputPassword,
    InputPhoneNumber,
    InputSecondPassword,
    InputSurname,
} from "@/components/auth/Inputs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Message from "@/components/auth/LoingMessage";
import PageWrapper from "@/components/layout/PageWrapper";

export default function AddAccount() {
    const [message, setMessage] = useState("");
    const [addAccount, setAddAccount] = useState<boolean | undefined>(undefined);
    const router = useRouter();

    const submitAddAccount = async (formData: FormData) => {
        setAddAccount(undefined);
        const password = formData.get("password");
        const secondpassword = formData.get("secondpassword");
        if (password !== secondpassword) {
            setAddAccount(false);
            setMessage("Hasła nie są takie same");
            setTimeout(() => {
                setAddAccount(undefined);
            }, 2 * 1000);
            return;
        } else {
            const name = formData.get("name");
            const surname = formData.get("surname");
            const birthDate = formData.get("birthDate");
            const phoneNumber = formData.get("phoneNumber");
            const email = formData.get("email");
            const newUser = {
                name,
                surname,
                birthDate,
                password,
                phoneNumber,
                email,
            };
            console.log(newUser);
            const result = 200;
            if (result === 200) {
                setAddAccount(true);
                setTimeout(() => {
                    router.push("/login");
                }, 6 * 1000);
            } else {
                setMessage(result);
                setAddAccount(false);
            }
            setTimeout(() => {
                setAddAccount(undefined);
            }, 6 * 1000);
        }
    };

    return (
        <PageWrapper className="flex justify-center items-center">
            <div className={`bg-mainWhite p-7 my-10 rounded shadow-md w-64 xs:w-80 lg:w-96 `}>
                <form action={submitAddAccount}>
                    <LoginHeader
                        title={"Stworzenie konta"}
                        description={"Wprowadź podane dane aby stworzyć konto."}
                    />
                    <InputName/>
                    <InputSurname/>
                    <InputPhoneNumber/>
                    <InputEmail/>
                    <InputBirthDate/>
                    <InputPassword/>
                    <InputSecondPassword/>
                    <LoginButton
                        messageIfLoadingIsTrue={"Sprawdzanie danych..."}
                        messageIfLoadingIsFalse={"Stwórz konto"}
                    />
                    <Message
                        value={addAccount}
                        messageIfIsRed={message}
                        messageIfIsGreen={"Konto zostało dodane poprawnie."}
                        messageIfIsGreenAdd="Zaraz zostanie przeniesiony na stronę logowania"
                    />
                </form>
            </div>
        </PageWrapper>
    );
}