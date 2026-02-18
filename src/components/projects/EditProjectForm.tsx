import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectById } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    project: ProjectFormData;
    projectId: Project["_id"];
};

export default function EditProjectForm({
    project,
    projectId,
}: EditProjectFormProps) {
    const { projectName, clientName, description } = project;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            projectName: projectName,
            clientName: clientName,
            description: description,
        },
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProjectById,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            toast.success(data);
            navigate("/");
        },
    });

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId,
        };
        mutate(data);
    };

    return (
        <>
            <div className='mx-auto max-w-3xl'>
                <h1 className='text-5xl font-black'>
                    Edit the project "{projectName}"
                </h1>
                <p className='mt-5 text-2xl font-light text-gray-500'>
                    Fill the next form
                </p>
                <nav className='my-5'>
                    <Link
                        to={"/"}
                        className='cursor-pointer bg-violet-600 px-10 py-3 text-xl font-bold text-white transition-colors hover:bg-violet-700'
                    >
                        Back to Projects
                    </Link>
                </nav>
                <form
                    className='mt-10 bg-white p-10 shadow-lg'
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm register={register} errors={errors} />
                    <input
                        type='submit'
                        value='Update project'
                        className='w-full cursor-pointer bg-violet-600 p-3 font-bold text-white uppercase transition-colors hover:bg-violet-700'
                    />
                </form>
            </div>
        </>
    );
}
