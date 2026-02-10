import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
        },
    });

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    };

    const handleComplete = (token: ConfirmToken["token"]) => {
        mutate({ token });
    };

    return (
        <>
            <h1 className='text-5xl font-black text-white'>
                Confirm Your Account
            </h1>
            <p className='mt-5 text-2xl font-light text-white'>
                Enter the code you received {""}
                <span className='font-bold text-fuchsia-500'> via email</span>
            </p>
            <form className='mt-10 space-y-8 bg-white p-10'>
                <label className='block text-center text-2xl font-normal'>
                    6-digit code
                </label>
                <div className='flex justify-center gap-5'>
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                        <PinInputField className='h-10 w-10 border border-gray-300 p-3 placeholder-white' />
                    </PinInput>
                </div>
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                    to='/auth/request-code'
                    className='text-center font-normal text-gray-300'
                >
                    Request a new Code
                </Link>
            </nav>
        </>
    );
}
