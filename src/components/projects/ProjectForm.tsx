import ErrorMessage from "@/components/ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProjectFormData } from "types";

type Props = {
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: Props) {
    return (
        <>
            <div className='mb-5 space-y-3'>
                <label
                    htmlFor='projectName'
                    className='text-sm font-bold uppercase'
                >
                    Projects name
                </label>
                <input
                    id='projectName'
                    className='w-full border border-purple-200 p-3'
                    type='text'
                    placeholder='Projects name'
                    {...register("projectName", {
                        required: "Title is mandatory",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className='mb-5 space-y-3'>
                <label
                    htmlFor='clientName'
                    className='text-sm font-bold uppercase'
                >
                    Name of client
                </label>
                <input
                    id='clientName'
                    className='w-full border border-purple-200 p-3'
                    type='text'
                    placeholder='Name of client'
                    {...register("clientName", {
                        required: "Name is mandatory",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className='mb-5 space-y-3'>
                <label
                    htmlFor='description'
                    className='text-sm font-bold uppercase'
                >
                    Descripción
                </label>
                <textarea
                    id='description'
                    className='w-full border border-purple-200 p-3'
                    placeholder='Description of project'
                    {...register("description", {
                        required: "Description is mandatory",
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
