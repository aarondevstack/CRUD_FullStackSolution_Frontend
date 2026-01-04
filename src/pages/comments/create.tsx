import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

export const CommentCreate = () => {
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
                    label="Content"
                    name="content"
                />

                <Controller
                    control={control}
                    name="post_id"
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            label="Blog ID"
                            error={!!errors.post_id}
                            helperText={errors.post_id?.message as string}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="user_id"
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
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
