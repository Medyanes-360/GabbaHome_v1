import { Box, Paper } from "@mui/material";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  GridColumnMenu,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import ButtonComponent from "../button";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function CustomTable({ rows, columns, paginationModel }) {
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{
          toolbar: CustomToolbar,
        }}
        disableColumnMenu
      />
    </Paper>
  );
}
function CustomToolbar({}) {
  return (
    <>
      {" "}
      <GridToolbarContainer className="flex items-center justify-between">
        <Box>
          <GridToolbarQuickFilter />
          <GridToolbarColumnsButton />
          <GridToolbarExport />
        </Box>
        <Box className="flex gap-2">
          <ButtonComponent
            text="Veri Ekle"
            classname="justify-self-end bg-green-500 px-4 py-2 rounded-md text-white "
          />
          <ButtonComponent
            text="Dil"
            classname="justify-self-end bg-green-500 px-4 py-2 rounded-md text-white "
          />
        </Box>
      </GridToolbarContainer>
    </>
  );
}
function CustomColumnMenu({ props }) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
      }}
    />
  );
}
