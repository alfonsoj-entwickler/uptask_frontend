import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import type { ProjectFormData } from "@/types/index";

export default function CreateProjectView() {
    const navigate = useNavigate();
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/");
        },
    });

    const handleForm = (formData: ProjectFormData) => mutate(formData);

    return (
        <>
            <div className='mx-auto max-w-3xl'>
                <h1 className='text-5xl font-black'>Create a project</h1>
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
                        value='Create project'
                        className='w-full cursor-pointer bg-violet-600 p-3 font-bold text-white uppercase transition-colors hover:bg-violet-700'
                    />
                </form>
            </div>
        </>
    );
}
