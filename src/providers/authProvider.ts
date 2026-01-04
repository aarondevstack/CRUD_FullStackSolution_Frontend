import type { AuthProvider } from "@refinedev/core";
import { jwtDecode } from "jwt-decode";

export const TOKEN_KEY = "refine-auth";

interface UserPayload {
    id: number;
    username: string;
    role: string;
    exp: number;
}

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming the backend returns { access_token: "..." }
                localStorage.setItem(TOKEN_KEY, data.access_token);
                return {
                    success: true,
                    redirectTo: "/",
                };
            } else {
                return {
                    success: false,
                    error: {
                        name: "LoginError",
                        message: "Invalid username or password",
                    },
                };
            }
        } catch (error) {
            return {
                success: false,
                error: {
                    name: "LoginError",
                    message: "Network error",
                },
            };
        }
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            // Optional: Check expiry
            try {
                const decoded = jwtDecode<UserPayload>(token);
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem(TOKEN_KEY);
                    return {
                        authenticated: false,
                        redirectTo: "/login",
                    };
                }
                return {
                    authenticated: true,
                };
            } catch (e) {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                };
            }
        }

        return {
            authenticated: false,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            const decoded = jwtDecode<UserPayload>(token);
            return decoded.role;
        }
        return null;
    },
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            const decoded = jwtDecode<UserPayload>(token);
            return {
                id: decoded.id,
                name: decoded.username,
                avatar: "https://i.pravatar.cc/300", // valid avatar for testing
                role: decoded.role,
            };
        }
        return null;
    },
    onError: async (error) => {
        if (error?.status === 401 || error?.statusCode === 401) {
            localStorage.removeItem(TOKEN_KEY);
            return {
                logout: true,
                redirectTo: "/login",
                error,
            };
        }
        console.error(error);
        return { error };
    },
};
