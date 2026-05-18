import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import type { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
    note: Note;
};
export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });

    if (isLoading) return <p>Loading ...</p>;
    const handleRemoveNote = () => {
        mutate({ projectId, taskId, noteId: note._id });
    };
    return (
        <div className='mb-2 flex items-center justify-between'>
            <div>
                <p>
                    {note.content} by:{" "}
                    <span className='font-bold'>{note.createdBy.name}</span>
                </p>
                <p className='text-xs text-slate-500'>
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button
                    type='button'
                    className='cursor-pointer bg-red-400 p-2 text-xs font-bold text-white transition-colors hover:bg-red-500'
                    onClick={handleRemoveNote}
                >
                    remove
                </button>
            )}
        </div>
    );
}
