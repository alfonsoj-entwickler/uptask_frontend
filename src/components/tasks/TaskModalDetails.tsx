import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { getTaskById, updateStatus } from "@/api/TaskAPi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formData } from "@/utils/utils";
import { statusTranslations } from "@/locales/en";
import type { TaskStatus } from "@/types/index";

export default function TaskModalDetails() {
    // get project id
    const params = useParams();
    const projectId = params.projectId!;

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;
    const show = taskId ? true : false;

    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
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
            navigate(location.pathname, { replace: true });
            toast.success(data);
        },
    });

    const handleChangeSelect = (
        selectEvent: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const data = {
            projectId,
            taskId,
            status: selectEvent.target.value as TaskStatus,
        };
        mutate(data);
    };

    if (isError) {
        toast.error(error.message, { toastId: "error" });
        return <Navigate to={`/projects/${projectId}`} />;
    }

    if (data)
        return (
            <>
                <Transition appear show={show} as={Fragment}>
                    <Dialog
                        as='div'
                        className='relative z-10'
                        onClose={() =>
                            navigate(location.pathname, { replace: true })
                        }
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
                                    <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden bg-white p-16 text-left align-middle shadow-xl transition-all'>
                                        <p className='text-sm text-slate-400'>
                                            Create at:{" "}
                                            {formData(data.createdAt)}
                                        </p>
                                        <p className='text-sm text-slate-400'>
                                            Update at:{" "}
                                            {formData(data.updatedAt)}
                                        </p>
                                        <Dialog.Title
                                            as='h3'
                                            className='my-5 text-4xl font-black text-slate-600'
                                        >
                                            {data?.name}
                                        </Dialog.Title>
                                        <p className='mb-2 text-lg text-slate-500'>
                                            {data?.description}
                                        </p>
                                        <div className='my-5 space-y-3'>
                                            <label className='font-bold'>
                                                Status: {data?.status}
                                            </label>
                                            <select
                                                className='w-full border border-gray-300 bg-white p-3'
                                                defaultValue={data.status}
                                                onChange={handleChangeSelect}
                                            >
                                                {Object.entries(
                                                    statusTranslations
                                                ).map(([key, value]) => (
                                                    <option
                                                        key={`${key}`}
                                                        value={`${key}`}
                                                    >
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        );
}
