import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });

    const password = watch("password");

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    };

    return (
        <>
            <h1 className='text-5xl font-black text-white'>Create a account</h1>
            <p className='mt-5 text-2xl font-light text-white'>
                Fill the register form {""}
                <span className='font-bold text-violet-500'>
                    {" "}
                    Create your account
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
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
                        placeholder='Email'
                        className='w-full border border-gray-300 p-3'
                        {...register("email", {
                            required: "The email field is mandatory",
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

                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>Nombre</label>
                    <input
                        type='name'
                        placeholder='Name'
                        className='w-full border border-gray-300 p-3'
                        {...register("name", {
                            required: "The name field is mandatory",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>Password</label>

                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full border border-gray-300 p-3'
                        {...register("password", {
                            required: "The password field is mandatory",
                            minLength: {
                                value: 8,
                                message: "Min 8 charactes",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>
                        Repetir Password
                    </label>

                    <input
                        id='password_confirmation'
                        type='password'
                        placeholder='Repeat Password'
                        className='w-full border border-gray-300 p-3'
                        {...register("password_confirmation", {
                            required: "The repeat password field is mandatory",
                            validate: (value) =>
                                value === password ||
                                "Tje Passwords are falsch",
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>
                            {errors.password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type='submit'
                    value='Register'
                    className='w-full cursor-pointer bg-violet-600 p-3 text-xl font-black text-white hover:bg-violet-700'
                />
            </form>
            <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                    to={"/auth/login"}
                    className='text-center font-normal text-gray-300'
                >
                    Open session
                </Link>
                <Link
                    to={"/auth/forgot-password"}
                    className='text-center font-normal text-gray-300'
                >
                    Forgot password
                </Link>
            </nav>
        </>
    );
}
