import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
    const navigate = useNavigate();
    const params = useParams();

    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
    });

    if (isLoading) return <p>Loading ...</p>;
    if (isError) return <Navigate to='/404' />;

    return (
        <>
            <h1 className='text-5xl font-black'>{data?.projectName}</h1>
            <p className='mt-5 text-2xl font-light text-gray-500'>
                {data?.description}
            </p>
            <nav className='my-5 flex gap-5'>
                <button
                    type='button'
                    className='cursor-pointer bg-violet-600 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-violet-700'
                    onClick={() =>
                        navigate(location.pathname + "?newTask=true")
                    }
                >
                    Add task
                </button>
            </nav>
            {data?.tasks && <TaskList tasks={data?.tasks} />}

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    );
}
