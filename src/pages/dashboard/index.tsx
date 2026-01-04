import { Typography, Paper, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <Paper sx={{ p: 4, mt: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {t("pages.dashboard.title")}
            </Typography>
            <Box mt={2}>
                <Typography variant="body1">
                    Welcome to the CRUD FullStack Solution Dashboard.
                </Typography>
            </Box>
        </Paper>
    );
};
