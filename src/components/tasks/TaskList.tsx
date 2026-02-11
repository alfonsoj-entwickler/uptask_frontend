import type { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";

type TaskListProps = {
    tasks: Task[];
};

type GroupedTasks = {
    [key: string]: Task[];
};

const initialStatusGroup: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
};

const statusStyles: { [key: string]: string } = {
    pending: "border-slate-500",
    onHold: "border-red-500",
    inProgress: "border-blue-500",
    underReview: "border-amber-500",
    completed: "border-emerald-500",
};

export default function TaskList({ tasks }: TaskListProps) {
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    return (
        <>
            <h2 className='my-10 text-5xl font-black'>Tasks</h2>

            <div className='flex gap-5 overflow-x-scroll pb-32 2xl:overflow-auto'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div
                        key={status}
                        className='min-w-[300px] 2xl:w-1/5 2xl:min-w-0'
                    >
                        <h3
                            className={`border border-t-8 bg-white p-3 text-xl font-light capitalize ${statusStyles[status]}`}
                        >
                            {statusTranslations[status]}
                        </h3>
                        <ul className='mt-5 h-full space-y-5 bg-slate-100 p-1.5 shadow'>
                            {tasks.length === 0 ? (
                                <li className='pt-3 text-center text-gray-500'>
                                    There aren't any tasks
                                </li>
                            ) : (
                                tasks.map((task) => (
                                    <TaskCard key={task._id} task={task} />
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
