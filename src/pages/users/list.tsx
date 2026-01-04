import { List, useDataGrid, DateField, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { zhCN, enUS } from "@mui/x-data-grid/locales";

export const UserList = () => {
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
        {
            field: "actions",
            headerName: t("table.actions"),
            sortable: false,
            filterable: false,
            renderCell: function (params) {
                return (
                    <>
                        <EditButton hideText recordItemId={params.row.id} />
                        <ShowButton hideText recordItemId={params.row.id} />
                        <DeleteButton hideText recordItemId={params.row.id} />
                    </>
                );
            },
            align: "center",
            headerAlign: "center",
            minWidth: 120,
        },
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
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                localeText={localeText}
            />
        </List>
    );
};
