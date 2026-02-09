import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
    const navigate = useNavigate();
    const initialValues: UserLoginForm = {
        email: "",
        password: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            reset();
            toast.success("Login - Active");
        },
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <>
            <h1 className='text-5xl font-black text-white'>Log in</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className='mt-10 space-y-8 bg-white p-10'
                noValidate
            >
                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>Email</label>

                    <input
                        id='email'
                        type='email'
                        placeholder='Email'
                        className='w-full border border-gray-300 p-3'
                        {...register("email", {
                            required: "The email field is mandatory",
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

                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>Password</label>

                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full border border-gray-300 p-3'
                        {...register("password", {
                            required: "The password field is mandatory",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type='submit'
                    value='Login'
                    className='w-full cursor-pointer bg-violet-600 p-3 text-xl font-black text-white hover:bg-violet-700'
                />
            </form>
            <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                    to={"/auth/register"}
                    className='text-center font-normal text-gray-300'
                >
                    Create a new account.
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
