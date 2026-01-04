import type { DataProvider, HttpError } from "@refinedev/core";

const apiUrl = "/api/v1";

const fetcher = async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem("refine-auth");
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
    };

    const response = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const data = await response.json();
        const error: HttpError = {
            message: data.error || response.statusText,
            statusCode: response.status,
        };
        return Promise.reject(error);
    }


    if (response.status === 204) {
        return {};
    }

    return response.json();
};

export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, sorters, filters }) => {
        const params = new URLSearchParams();

        if (pagination && pagination.mode !== "client") {
            params.append("page", (pagination.currentPage || 1).toString());
            params.append("limit", (pagination.pageSize || 10).toString());
        } else {
            // Client-side mode or no pagination: Fetch all (limit=1000 safe upper bound for now)
            params.append("page", "1");
            params.append("limit", "1000");
        }

        // Note: Backend currently might not support sorting/filtering but we send them for future compatibility
        if (sorters && sorters.length > 0) {
            params.append("sort", `${sorters[0].field} ${sorters[0].order}`);
        }

        // Basic support for filters (adapting simple key=value)
        if (filters) {
            filters.forEach((filter) => {
                if ("field" in filter && filter.operator === "eq") {
                    params.append(filter.field, filter.value as string);
                }
            });
        }

        const url = `/${resource}?${params.toString()}`;
        const response = await fetcher(url);

        // Backend returns pagination response with { data: [], total: number }
        return {
            data: response.data,
            total: response.total,
        };
    },

    getOne: async ({ resource, id }) => {
        const data = await fetcher(`/${resource}/${id}`);
        return { data };
    },

    create: async ({ resource, variables }) => {
        const data = await fetcher(`/${resource}`, {
            method: "POST",
            body: JSON.stringify(variables),
        });
        return { data };
    },

    update: async ({ resource, id, variables }) => {
        const data = await fetcher(`/${resource}/${id}`, {
            method: "PATCH", // Backend uses PATCH
            body: JSON.stringify(variables),
        });
        return { data };
    },

    deleteOne: async ({ resource, id }) => {
        await fetcher(`/${resource}/${id}`, {
            method: "DELETE",
        });
        return { data: { id } as any };
    },

    getApiUrl: () => apiUrl,

    // Optional methods - implemented as needed
    getMany: async ({ resource, ids }) => {
        // Naive implementation with Promise.all since backend doesn't support bulk get
        const data = await Promise.all(
            ids.map(id => fetcher(`/${resource}/${id}`))
        );
        return { data };
    },

    createMany: async () => { throw new Error("Not implemented"); },
    updateMany: async () => { throw new Error("Not implemented"); },
    deleteMany: async () => { throw new Error("Not implemented"); },
};
