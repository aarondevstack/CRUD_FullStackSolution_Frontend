import { Show, TextFieldComponent, DateField, MarkdownField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import { useShow } from "@refinedev/core";
import { useTranslation } from "react-i18next";

export const BlogShow = () => {
    const { t } = useTranslation();
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t("pages.blogs.fields.title", "Title")}
                </Typography>
                <TextFieldComponent value={record?.title} />

                <Typography variant="body1" fontWeight="bold">
                    {t("pages.blogs.fields.content", "Content")}
                </Typography>
                <MarkdownField value={record?.content} />

                <Typography variant="body1" fontWeight="bold">
                    User ID
                </Typography>
                <TextFieldComponent value={record?.user_id} />

                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.created_at} />
            </Stack>
        </Show>
    );
};
