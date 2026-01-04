import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

export const UserList = () => {
    const { t } = useTranslation();
    const { dataGridProps } = useDataGrid();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", type: "number", width: 70 },
        { field: "username", headerName: t("pages.users.fields.username", "Username"), flex: 1 },
        { field: "email", headerName: t("pages.users.fields.email", "Email"), flex: 1 },
        { field: "role", headerName: t("pages.users.fields.role", "Role"), width: 100 },
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
