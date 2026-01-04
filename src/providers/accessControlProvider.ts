import type { AccessControlProvider } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action, params }) => {
        const role = localStorage.getItem("refine-auth-role"); // Note: In authProvider we return role in getPermissions but don't explicitly store it unless we do it in login.
        // Actually authProvider.getPermissions is called by usePermissions.
        // But AccessControlProvider is easier with authProvider.getPermissions or re-decoding token.

        // Better strategy: decode token here or assume role is passed in some context? 
        // Refine calls can({ resource, action, params }).

        // Let's rely on authProvider.getPermissions mechanism or just decode localStorage again for simplicity/speed
        // But correct way is likely relying on what we have.

        // Let's decode token.
        const token = localStorage.getItem("refine-auth");
        if (!token) return { can: false };

        let userRole = "user"; // Default
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userRole = payload.role || "user";
        } catch (e) {
            // invalid token
        }

        if (userRole === "admin") {
            return { can: true };
        }

        // User Role Permissions
        if (action === "list" || action === "show") {
            return { can: true };
        }

        // Users cannot create/edit/delete
        return { can: false, reason: "Unauthorized" };
    },
};
