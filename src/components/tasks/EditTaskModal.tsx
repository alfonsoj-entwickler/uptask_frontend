import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { TaskFormData, Task } from "@/types/index";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTaskById } from "@/api/TaskAPi";

type EditTaskModalProps = {
    task: Task;
    taskId: string;
};

export default function EditTaskModal({ task, taskId }: EditTaskModalProps) {
    const navigate = useNavigate();

    const params = useParams();
    const projectId = params.projectId!;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({
        defaultValues: {
            name: task.name,
            description: task.description,
        },
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTaskById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
            toast.success(`Update - ${data}`);
            reset();
            navigate(location.pathname, { replace: true });
        },
    });

    const handleEditTask = (formData: TaskFormData) => {
        const data = { projectId, taskId, formData };
        mutate(data);
    };

    return (
        <Transition appear show={!!task} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => navigate(location.pathname, { replace: true })}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/60' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-16 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='my-5 text-4xl font-black'
                                >
                                    Edit task{" "}
                                    <span className='text-green-600 underline'>
                                        '{task.name}'
                                    </span>
                                </Dialog.Title>

                                <p className='text-xl font-bold'>
                                    Change the task {""}
                                    <span className='text-violet-700'>
                                        in this form
                                    </span>
                                </p>

                                <form
                                    className='mt-10 space-y-3'
                                    noValidate
                                    onSubmit={handleSubmit(handleEditTask)}
                                >
                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />
                                    <input
                                        type='submit'
                                        className='w-full cursor-pointer bg-violet-600 p-3 text-xl font-black text-white transition-colors hover:bg-violet-700'
                                        value='Save task'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
