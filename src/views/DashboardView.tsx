import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectById, getProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

export default function DashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: getProject,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteProjectById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success(data);
        },
    });

    if (isLoading) return <p>Loading ...</p>;

    return (
        <>
            <h1 className='text-5xl font-black'>My Projects</h1>
            <p className='mt-5 text-2xl font-light text-gray-500'>
                Managament your projects
            </p>
            <nav className='my-5'>
                <Link
                    to={"/projects/create"}
                    className='cursor-pointer bg-violet-600 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-violet-700'
                >
                    New Project
                </Link>
            </nav>
            <ul
                role='list'
                className='mt-10 divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg'
            >
                {data?.map((project) => (
                    <li
                        key={project._id}
                        className='flex justify-between gap-x-6 px-5 py-10 odd:bg-slate-100'
                    >
                        <div className='flex min-w-0 gap-x-4'>
                            <div className='min-w-0 flex-auto space-y-2'>
                                <Link
                                    to={`/projects/${project._id}`}
                                    className='cursor-pointer text-3xl font-bold text-gray-600 hover:underline'
                                >
                                    {project.projectName}
                                </Link>
                                <p className='text-sm font-black text-gray-600'>
                                    Client: {project.clientName}
                                </p>
                                <p className='text-sm text-gray-400'>
                                    {project.description}
                                </p>
                            </div>
                        </div>
                        <div className='flex shrink-0 items-center gap-x-6'>
                            <Menu as='div' className='relative flex-none'>
                                <Menu.Button className='-m-2.5 block cursor-pointer p-2.5 text-gray-500 hover:text-gray-900'>
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
                                    <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                                        <Menu.Item>
                                            <Link
                                                to={`/projects/${project._id}`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            >
                                                See Project
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                to={`/projects/${project._id}/edit`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            >
                                                Edit Project
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button
                                                type='button'
                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                onClick={() =>
                                                    mutate(project._id)
                                                }
                                            >
                                                Delete Project
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
