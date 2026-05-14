/**
 * api/TaskAPi.ts
 *
 * CRUD operations for tasks, scoped under a parent project.
 * All endpoints follow the /projects/:projectId/tasks pattern to enforce
 * that tasks always belong to a project.
 */

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { tasksSchema, type Project, type Task, type TaskFormData } from "../types";

/** Shared parameter type for task API functions. */
type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

/** Creates a new task inside the specified project. */
export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'> ) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - createTask: ${error.response.data.error}`
            );
        }
    }
}


/**
 * Fetches the full detail of a single task, including audit history and notes.
 * Validates the response with Zod's safeParse before returning so callers
 * receive a type-safe Task object.
 */
export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'> ) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get<Task>(url);
        const response = tasksSchema.safeParse(data);
        if (response.success) {
            // console.log(response.data)
            return data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - getTaskById: ${error.response.data.error}`
            );
        }
    }
}

/** Updates a task's name and description. Returns the updated task name. */
export async function updateTaskById({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'> ) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put<Task>(url, formData);
        return data.name;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - updateTaskById: ${error.response.data.error}`
            );
        }
    }
}

/** Permanently deletes a task from the project. */
export async function deleteTask({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'> ) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete<string>(url);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - deleteTask: ${error.response.data.error}`
            );
        }
    }
}

/**
 * Updates only the status of a task — the Kanban "move" action.
 * Called by TaskList when the user drops a card into a different column.
 * The UI optimistically updates the cache before this request completes
 * (see TaskList.tsx handleDragEnd).
 */
export async function updateStatus({projectId, taskId, status}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'> ) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post<string>(url, {status});
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - updateStatus: ${error.response.data.error}`
            );
        }
    }
}