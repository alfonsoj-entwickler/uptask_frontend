import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
    // prject id
    const params = useParams();
    const projectId = params.projectId!;

    // task id
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const initialValues: NoteFormData = {
        content: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
        },
    });
    const handleAddNote = (formData: NoteFormData) => {
        const data = {
            projectId,
            taskId,
            formData,
        };
        mutate(data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className='space-y-3'
            noValidate
        >
            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor='content'>
                    Create a note
                </label>
                <input
                    id='content'
                    type='text'
                    placeholder='Note content'
                    className='w-full border border-gray-300 p-3'
                    {...register("content", {
                        required: "The content is required",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content?.message}</ErrorMessage>
                )}
            </div>
            <input
                type='submit'
                value='Create note'
                className='w-full cursor-pointer bg-violet-600 p-2 font-black text-white transition-colors hover:bg-violet-700'
            />
        </form>
    );
}
