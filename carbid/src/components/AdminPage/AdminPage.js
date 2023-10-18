import { apiDeleteUser, apiGetUsers, apiUpdateUserRole } from "ServiceUsers";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { MdDeleteOutline } from "react-icons/md";
import { IconButton } from "@mui/material";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const columns = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "changeRole",
      headerName: "Change Role",
      renderCell: (params) => (
        <>
          <TextField
            select
            variant="standard"
            defaultValue={params.row.role}
            onChange={(event) =>
              updateUserRole(params.row.id, event.target.value)
            }
            disabled={params.row.username === "admin"}
          >
            <MenuItem key="Admin" value="Admin">
              Admin
            </MenuItem>
            <MenuItem key="Basic" value="Basic">
              Basic
            </MenuItem>
          </TextField>
        </>
      ),
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete User",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteUser(params.row.id)}
          disabled={params.row.username === "admin"}
        >
          <MdDeleteOutline
            style={{
              fontSize: 20,
              color: params.row.username === "admin" ? "grey" : "red",
            }}
          />
        </IconButton>
      ),
      flex: 1,
    },
  ];

  const updateUserRole = (id, role) => {
    console.log(id, role);
    apiUpdateUserRole(id, role).then(() => fetchUsers());
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      apiDeleteUser(id).then(() => fetchUsers());
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    apiGetUsers().then((resp) => {
      setUsers(resp.users);
    });
  };

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[]}
          hideFooterSelectedRowCount
        />
      </div>
    </>
  );
};

export default AdminPage;
