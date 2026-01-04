import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

export const UserCreate = () => {
    const { t } = useTranslation();
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("username", {
                        required: "This field is required",
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t("pages.users.fields.username", "Username")}
                    name="username"
                />
                <TextField
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    label={t("pages.users.fields.email", "Email")}
                    name="email"
                />
                <TextField
                    {...register("password", {
                        required: "This field is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    label={t("pages.users.fields.password", "Password")}
                    name="password"
                />
                <Controller
                    control={control}
                    name="role"
                    rules={{ required: "This field is required" }}
                    defaultValue="user"
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={["user", "admin"]}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="normal"
                                    label={t("pages.users.fields.role", "Role")}
                                    error={!!errors.role}
                                    helperText={errors.role?.message as string}
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
