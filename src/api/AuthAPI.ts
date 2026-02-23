import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
    ConfirmToken,
    RequestConfirmationCodeForm,
    UserLoginForm,
    UserRegistrationForm,
    ForgotPasswordForm,
    NewPasswordForm,
} from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post<string>(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function confirmAccount(token: ConfirmToken) {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post<string>(url, token);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function requestConfirmationCode(
    email: RequestConfirmationCodeForm
) {
    try {
        const url = "/auth/request-code";
        const { data } = await api.post<string>(url, email);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function authenticateUser(user: UserLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post<string>(url, user);
        localStorage.setItem('AUTH_TOKEN', data)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password";
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function validateToken(token: ConfirmToken) {
    try {
        const url = "/auth/validate-token";
        const { data } = await api.post<string>(url, token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}