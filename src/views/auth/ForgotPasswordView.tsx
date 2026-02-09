import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import type { ForgotPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });

    const handleForgotPassword = (formData: ForgotPasswordForm) =>
        mutate(formData);

    return (
        <>
            <h1 className='text-5xl font-black text-white'>Create a account</h1>
            <p className='mt-5 text-2xl font-light text-white'>
                Fill the register form {""}
                <span className='font-bold text-violet-500'>
                    {" "}
                    Reset your password
                </span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
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
                        placeholder='Register email'
                        className='w-full border border-gray-300 p-3'
                        {...register("email", {
                            required: "The email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail not valid",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type='submit'
                    value='Send'
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
                    to='/auth/register'
                    className='text-center font-normal text-gray-300'
                >
                    Don't have an account? Create one
                </Link>
            </nav>
        </>
    );
}
