import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";
import type { RequestConfirmationCodeForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset();
            toast.success(data);
        },
    });

    const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
        mutate(formData);

    return (
        <>
            <h1 className='text-5xl font-black text-white'>
                Request Confirmation Code
            </h1>
            <p className='mt-5 text-2xl font-light text-white'>
                Enter your email to receive {""}
                <span className='font-bold text-violet-500'> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className='mt-10 space-y-8 bg-white p-10'
                noValidate
            >
                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal' htmlFor='email'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Registration Email'
                        className='w-full border border-gray-300 p-3'
                        {...register("email", {
                            required: "The registration email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type='submit'
                    value='Send Code'
                    className='w-full cursor-pointer bg-violet-600 p-3 text-xl font-black text-white hover:bg-violet-700'
                />
            </form>

            <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                    to='/auth/login'
                    className='text-center font-normal text-gray-300'
                >
                    Already have an account? Log In
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className='text-center font-normal text-gray-300'
                >
                    Forgot your password? Reset it
                </Link>
            </nav>
        </>
    );
}
