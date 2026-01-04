import { Show, TextFieldComponent, DateField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import { useShow } from "@refinedev/core";
import { useTranslation } from "react-i18next";

export const UserShow = () => {
    const { t } = useTranslation();
    const { query } = useShow();
    const { data, isLoading } = query;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t("pages.users.fields.id", "ID")}
                </Typography>
                <TextFieldComponent value={record?.id} />

                <Typography variant="body1" fontWeight="bold">
                    {t("pages.users.fields.username", "Username")}
                </Typography>
                <TextFieldComponent value={record?.username} />

                <Typography variant="body1" fontWeight="bold">
                    {t("pages.users.fields.email", "Email")}
                </Typography>
                <TextFieldComponent value={record?.email} />

                <Typography variant="body1" fontWeight="bold">
                    {t("pages.users.fields.role", "Role")}
                </Typography>
                <TextFieldComponent value={record?.role} />

                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.created_at} />
            </Stack>
        </Show>
    );
};
