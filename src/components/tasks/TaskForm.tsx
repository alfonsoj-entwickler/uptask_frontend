import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>;
    register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
    return (
        <>
            <div className='flex flex-col gap-5'>
                <label className='text-2xl font-normal' htmlFor='name'>
                    Name of task
                </label>
                <input
                    id='name'
                    type='text'
                    placeholder='Name of task'
                    className='w-full border border-gray-300 p-3'
                    {...register("name", {
                        required: "the name is madatory",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className='flex flex-col gap-5'>
                <label className='text-2xl font-normal' htmlFor='description'>
                    Description of task
                </label>
                <textarea
                    id='description'
                    placeholder='Description of task'
                    className='w-full border border-gray-300 p-3'
                    {...register("description", {
                        required: "the description is madatory",
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
