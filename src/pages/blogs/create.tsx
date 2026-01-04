import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

export const BlogCreate = () => {
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
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message as string}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t("pages.blogs.fields.title", "Title")}
                    name="title"
                />
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!errors.content}
                    helperText={errors.content?.message as string}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={4}
                    label={t("pages.blogs.fields.content", "Content")}
                    name="content"
                />

                <Controller
                    control={control}
                    name="user_id"
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        // Ideally this should look up users, but for now a simple number input or autocomplete if we had a user resource to fetch from
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            label="User ID"
                            error={!!errors.user_id}
                            helperText={errors.user_id?.message as string}
                        />
                    )}
                />
            </Box>
        </Create>
    );
};
