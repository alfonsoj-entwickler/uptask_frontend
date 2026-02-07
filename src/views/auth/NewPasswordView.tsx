import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/index";
import { useState } from "react";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");
    const [isValidToken, setIsValidToken] = useState(false);
    return (
        <>
            <h1 className='text-5xl font-black text-white'>
                Reset your password
            </h1>
            <p className='mt-5 text-2xl font-light text-white'>
                Fill the code from {""}
                <span className='font-bold text-violet-500'> your email</span>
            </p>
            {!isValidToken ? (
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordForm token={token} />
            )}
        </>
    );
}
