import { List, useDataGrid, DateField, MarkdownField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { zhCN, enUS } from "@mui/x-data-grid/locales";

export const BlogList = () => {
    const { t, i18n } = useTranslation();
    const { dataGridProps } = useDataGrid({
        pagination: { mode: "off" },
        filters: { mode: "off" },
        sorters: { mode: "off" },
        syncWithLocation: true,
    });

    const localeText = i18n.language === "zh-CN"
        ? zhCN.components.MuiDataGrid.defaultProps.localeText
        : enUS.components.MuiDataGrid.defaultProps.localeText;

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", type: "number", width: 70 },
        { field: "title", headerName: t("pages.blogs.fields.title", "Title"), flex: 1 },
        {
            field: "content",
            headerName: t("pages.blogs.fields.content", "Content"),
            flex: 1,
            renderCell: function (params) {
                return <MarkdownField value={params.value?.slice(0, 80) + "..."} />;
            }
        },
        { field: "user_id", headerName: "User ID", type: "number", width: 100 },
        {
            field: "created_at",
            headerName: "Created At",
            width: 150,
            renderCell: function (params) {
                return <DateField value={params.value} />;
            },
        },
    ];

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                localeText={localeText}
            />
        </List>
    );
};
