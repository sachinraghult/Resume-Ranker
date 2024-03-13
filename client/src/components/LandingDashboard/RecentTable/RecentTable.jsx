import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecentTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Context } from "../../../context/Context";

import { SERVER_URL } from "../../../config";

export default function RecentTable() {
  const { authToken } = useContext(Context);
  const [row, setRow] = useState([]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchRecentTable = async () => {
      const res = await axios.get(
        `${SERVER_URL}/landingDashboard/recentTable/recentTable`,
        {
          headers: { Authorization: authToken },
        }
      );
      res ? setRow(res.data) : setRow([]);
    };

    fetchRecentTable();
  }, []);

  function onEmailClick(email) {
    window.open(`mailto:${email}`);
  }

  const columns = [
    // {
    //   field: "id",
    //   headerName: "S.NO",
    //   width: 75,
    //   renderCell: (params) => {
    //     return <div> {params.row.id + 1}</div>;
    //   },
    // },
    {
      field: "ApplicantName",
      headerName: "Applicant Name",
      width: 300,
      renderCell: (params) => {
        return (
          <div>
            <b>{params.row.ApplicantName}</b>
          </div>
        );
      },
    },
    {
      field: "mailID",
      headerName: "Applicant Detail",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.mailID.split("&")[0] === "from bulk resumes" ? (
              <a
                href={`/ranking/${params.row.mailID.split("&")[1]}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Bulk Upload Resume</div>
              </a>
            ) : (
              <div
                style={{ color: "brown", cursor: "pointer" }}
                onClick={() => onEmailClick(params.row.mailID)}
              >
                {params.row.mailID}
              </div>
            )}
          </div>
        );
      },
    },
    { field: "PostName", headerName: "Post Applied", width: 300 },
    {
      field: "Date",
      headerName: "Date",
      renderCell: (params) => {
        return <div> {formatDate(params.row.Date)}</div>;
      },
      // sortable: false,
      width: 150,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Resume",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <a
              href={`https://drive.google.com/uc?id=${params.row.action}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Resume</div>
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="widgetLgLanding">
      <h3 className="widgetLgTitleLanding">Recent Applications</h3>
      <br></br>
      <div style={{ height: 400, width: "100%", backgroundColor: "#e8e8e5" }}>
        <DataGrid
          rows={row}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

// const rows = [
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
//   {
//     id: 1,
//     ApplicantName: "Sachin Raghul",
//     mailID: "sachinraghult2002@gmail.com",
//     Date: formatDate("2019-04-03T21:00:00+00:00"),
//   },
// ];
