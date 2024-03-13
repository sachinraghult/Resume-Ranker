import { DataGrid } from "@mui/x-data-grid";
import HeatMap from "./Heatmap";
import "./datatable.css";
import { userColumns, userRows } from "./datatablesource";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

import { SERVER_URL } from "../../config";
import { Box, withStyles } from "@material-ui/core";

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
  },
})(DataGrid);

const Datatable = (props) => {
  const { authToken } = useContext(Context);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [checked, setChecked] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/application/ranking/` + path,
          {
            headers: { Authorization: authToken },
          }
        );

        const overallRanking = [...res.data.result].sort(
          (a, b) =>
            b.preprocessing_data.scores[0] - a.preprocessing_data.scores[0]
        );

        const finalOverallRanking = [...overallRanking, ...res.data.failed];
        setData(finalOverallRanking);
      } catch (err) {}
    };

    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let datas = [];
  if (props.cat && props.cat != "Select Category" && props.str !== "") {
    var catName;
    if (props.cat === "Skills") catName = "skills";
    else if (props.cat === "Instituition") catName = "college_name";
    else if (props.cat === "Organisation") catName = "company_names";

    const finnd = (data) => {
      if (data.preprocessing_data) {
        let p = data.preprocessing_data[catName];
        return p.find((element) => {
          if (element.toLowerCase() === props.str.toLowerCase()) {
            if (props.searcher && !props.bulk)
              if (!data.isBulk) return true;
              else return false;
            else if (!props.searcher && props.bulk)
              if (data.isBulk) return true;
              else return false;
            else return true;
          }
        });
      }
    };
    data.filter((data) => finnd(data))?.map((data) => datas.push(data));
  } else if (props.searcher && !props.bulk) {
    const finnd = (data) => {
      if (!data.isBulk) return true;
    };

    data.filter((data) => finnd(data))?.map((data) => datas.push(data));
  } else if (!props.searcher && props.bulk) {
    const finnd = (data) => {
      if (data.isBulk) return true;
    };
    data.filter((data) => finnd(data))?.map((data) => datas.push(data));
  } else {
    datas = data;
  }

  const includeList = [];
  if (props.skill) includeList.push(1);
  if (props.exp) includeList.push(2);
  if (props.org) includeList.push(3);
  if (props.jobs) includeList.push(4);
  if (props.keyword) includeList.push(5);
  if (props.ins) includeList.push(6);
  if (includeList.length === 0) includeList.push(0);

  const calculateSum = (a) => {
    if (a.preprocessing_data) {
      let total = 0;
      includeList?.map((i) => (total += a.preprocessing_data.scores[i]));
      return total;
    } else {
      return 0;
    }
  };

  const ranking = [...datas].sort((a, b) => calculateSum(b) - calculateSum(a));

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View Resume</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const rankColumn = [
    {
      field: "rank",
      headerName: "Rank",
      width: 200,
      renderCell: (params) => {
        return <div> {1}</div>;
      },
    },
  ];

  const heatColumn = [];

  const OverallScoreColumn = [
    {
      field: "overall",
      headerName: "Score",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <b>
              {params.row.preprocessing_data
                ? params.row.preprocessing_data.scores[0].toFixed(2)
                : 0}
            </b>
          </div>
        );
      },
    },
    {
      field: "heatmap",
      headerName: "Score Distribution",
      width: 350,
      renderCell: (params) => {
        return (
          <div style={{ marginBottom: "10px" }}>
            {params.row.preprocessing_data ? (
              <HeatMap scores={params.row.preprocessing_data.scores} />
            ) : (
              <div style={{ marginTop: "25px", marginBottom: "20px" }}>
                No Data
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {/* <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div> */}
      <StyledDataGrid
        height="50px"
        className="datagrid"
        rows={ranking}
        columns={userColumns.concat(OverallScoreColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
