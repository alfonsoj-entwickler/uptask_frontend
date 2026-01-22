import { z } from "zod";

/** Auth & Users **/
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
});


type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ConfirmToken = Pick<Auth, 'token'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>


/** Tasks **/
export const tasksStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof tasksStatusSchema>;

export const tasksSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: tasksStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
});

export type Task = z.infer<typeof tasksSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Projects **/
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(tasksSchema),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
    Project,
    "projectName" | "clientName" | "description"
>;
