import { Fragment } from "react";
import type { Task } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/TaskAPi";
import { toast } from "react-toastify";

type TaskCardProps = {
    task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const taskId = task._id;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            toast.success(data);
        },
    });

    return (
        <li className='flex justify-between gap-3 border border-slate-300 bg-slate-50 p-3'>
            <div className='flex min-w-0 flex-col gap-y-4'>
                <button
                    type='button'
                    className='text-left text-lg font-bold text-slate-600'
                >
                    {task.name}
                </button>
                <p className='text-sm text-slate-500'>{task.description}</p>
            </div>
            <div className='flex shrink-0 gap-x-6'>
                <Menu as='div' className='relative flex-none'>
                    <Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
                        <span className='sr-only'>options</span>
                        <EllipsisVerticalIcon
                            className='h-9 w-9'
                            aria-hidden='true'
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute -right-2.5 z-10 mt-2 w-56 origin-top-right bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() =>
                                        navigate(
                                            location.pathname +
                                                `?viewTask=${taskId}`
                                        )
                                    }
                                >
                                    See Task
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() =>
                                        navigate(
                                            location.pathname +
                                                `?editTask=${taskId}`
                                        )
                                    }
                                >
                                    Edit Task
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                    onClick={() =>
                                        mutate({ projectId, taskId })
                                    }
                                >
                                    Delete Task
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    );
}
