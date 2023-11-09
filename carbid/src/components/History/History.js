import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetBids } from "services/ServiceBids";

const History = () => {
  const [loadingPage, setLoadingPage] = useState(false);
  const [bids, setBids] = useState([]);
  const columns = [
    {
      field: "carName",
      headerName: "Car",
      flex: 1,
      renderCell: (params) => (
        <span>
          <Link to={`/details/${params.row.carId}`}>{params.row.carName}</Link>
        </span>
      ),
    },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <span>
          {new Date(params.row.date).toLocaleString()}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = () => {
    const user = localStorage.user;
    if (!user) {
      return;
    }
    apiGetBids(user).then((bids) => {
      setBids(bids);
    });
  };

  return (
    <>
      {loadingPage ? (
        <div>
          <LinearProgress className="mb-3" />
        </div>
      ) : (
        <>
          <div className="text-center">
            <div className="h3 my-2">My History</div>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={bids}
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
      )}
    </>
  );
};

export default History;
