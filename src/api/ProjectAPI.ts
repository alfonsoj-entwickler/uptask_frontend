/**
 * api/ProjectAPI.ts
 *
 * CRUD operations for projects.
 * All responses are validated with Zod before being returned so that the
 * rest of the app always works with well-typed data.
 */

import api from "@/lib/axios";
import {
    dashboardProjectSchema,
    editProjectSchema,
    projectSchema,
    type Project,
    type ProjectFormData,
} from "@/types/index";
import { isAxiosError } from "axios";

/** Creates a new project owned by the currently authenticated user (who becomes the manager). */
export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - createProject: ${error.response.data.error}`
            );
        }
    }
}

/**
 * Fetches all projects visible to the current user (own + team member projects).
 * Validates against dashboardProjectSchema — a lightweight schema with no tasks
 * or team details, suitable for the project list/dashboard view.
 */
export async function getProject() {
    try {
        const { data } = await api.get("/projects");
        const response = dashboardProjectSchema.safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - getProject: ${error.response.data.error}`
            );
        }
    }
}

/**
 * Fetches a single project using the edit schema (name, client, description only).
 * Used to pre-populate the edit project form — excludes tasks and team data
 * that are not editable through that form.
 */
export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data);
        if (response.success) {
            return response.data
        }
        // return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - getProjectById: ${error.response.data.error}`
            );
        }
    }
}

/**
 * Fetches a project with all fields: tasks (lightweight) and team (user IDs).
 * Validates against the full projectSchema. Used by ProjectDetailsView to
 * populate the Kanban board and check manager permissions.
 */
export async function getFullProject(id: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data
        }
        // return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - getProjectById: ${error.response.data.error}`
            );
        }
    }
}

/** Argument type for updateProjectById — groups formData and projectId together. */
type ProjectAPIType = {
    formData: ProjectFormData
    projectId: Project['_id']
}

/** Updates the editable fields of a project (name, client, description). */
export async function updateProjectById({ formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - updateProject: ${error.response.data.error}`
            );
        }
    }
}

/** Permanently deletes a project and all of its tasks. */
export async function deleteProjectById(id: Project["_id"]) {
    try {
        const url = `/projects/${id}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                `Error - deleteProject: ${error.response.data.error}`
            );
        }
    }
}
