/**
 * api/AuthAPI.ts
 *
 * All API calls related to authentication and the current user's session.
 * Each function wraps an Axios call with Axios error detection and re-throws
 * a plain Error so React Query can handle it uniformly.
 */

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
    type ConfirmToken,
    type RequestConfirmationCodeForm,
    type UserLoginForm,
    type UserRegistrationForm,
    type ForgotPasswordForm,
    type NewPasswordForm,
    userSchema,
    type CheckPasswordForm,
} from "../types";

/** Creates a new user account. The account must be confirmed before login. */
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

/** Confirms a user account using the 6-digit token sent to their email. */
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

/** Re-sends a confirmation code to users who didn't receive the original email. */
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

/**
 * Authenticates the user and persists the returned JWT to localStorage.
 * The token is later injected into every request by the Axios interceptor
 * defined in lib/axios.ts.
 */
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

/** Sends a password-reset email containing a one-time token. */
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

/** Validates the password-reset token before allowing the user to set a new password. */
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

/**
 * Sets a new password using the token received in the reset email.
 * The token is included in the URL path to identify the reset request.
 */
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

/**
 * Fetches the currently authenticated user's profile.
 * Uses Zod's safeParse to validate the response shape at runtime before
 * returning, ensuring the rest of the app always receives a well-typed User.
 */
export async function getUser() {
    try {
        const { data } = await api.get('/auth/user');
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

/**
 * Verifies the user's current password.
 * Used before performing sensitive operations (e.g., deleting a project)
 * to re-confirm the user's identity.
 */
export async function checkPassword(formData: CheckPasswordForm) {
    try {
        const url = `/auth/check-password`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}
