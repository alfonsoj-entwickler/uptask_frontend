import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import type { ConfirmToken, NewPasswordForm } from "@/types/index";

type NewPasswordFormProps = {
    token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();

    const initialValues: NewPasswordForm = {
        password: "",
        password_confirmation: "",
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });

    const handleNewPassword = (formData: NewPasswordForm) =>
        mutate({ formData, token });

    const password = watch("password");

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className='mt-10 space-y-8 bg-white p-10'
                noValidate
            >
                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>Password</label>

                    <input
                        type='password'
                        placeholder='Register password'
                        className='w-full border border-gray-300 p-3'
                        {...register("password", {
                            required: "The password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "El Password debe ser mínimo de 8 caracteres",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className='flex flex-col gap-5'>
                    <label className='text-2xl font-normal'>
                        Repeat Password
                    </label>

                    <input
                        id='password_confirmation'
                        type='password'
                        placeholder='Repite Password de Registro'
                        className='w-full border border-gray-300 p-3'
                        {...register("password_confirmation", {
                            required: "Repeat Password is required",
                            validate: (value) =>
                                value === password ||
                                "The password are not right",
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
                    value='Create password'
                    className='w-full cursor-pointer bg-fuchsia-600 p-3 text-xl font-black text-white hover:bg-fuchsia-700'
                />
            </form>
        </>
    );
}
