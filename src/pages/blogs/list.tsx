import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

export const BlogList = () => {
    const { t } = useTranslation();
    const { dataGridProps } = useDataGrid();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", type: "number", width: 70 },
        { field: "title", headerName: t("pages.blogs.fields.title", "Title"), flex: 1 },
        { field: "user_id", headerName: "Author ID", width: 100 },
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
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
