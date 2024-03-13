import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeatMap from "./Heatmap";

function TableComponent({ tableDetails }) {
  const [tableContent, setTableContent] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      height: 25,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  function createData(rank, name, score, scores) {
    return { rank, name, score, scores };
  }

  useEffect(() => {
    const fetchTable = () => {
      let tableData = [
        // createData(1, "Name", 16.0),
      ];

      tableDetails?.details?.map((row, i) => {
        tableData.push(
          createData(i + 1, row.users, row.scores[0].toFixed(2), row.scores)
        );
      });

      setTableContent(tableData);
    };
    fetchTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        marginTop: "25px",
        marginBottom: "50px",
        width: "100%",
        height: "100%",
      }}
    >
      {tableContent.length ? (
        <>
          <h3>Top Applicant Score Distribution Details</h3>
          <TableContainer>
            <Table
              sx={{ maxWidth: 800 }}
              style={{ fontSize: "100px" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Rank</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Score</StyledTableCell>
                  <StyledTableCell align="center">
                    Score Distribution
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableContent?.map((table) => (
                  <StyledTableRow key={table.rank}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <b>{table.rank}</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      &nbsp;&nbsp;&nbsp;&nbsp;<b>{table.name}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>
                        <i>{table.score}</i>
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <HeatMap scores={table.scores} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h5>No applicants applied!</h5>
      )}
    </div>
  );
}

export default TableComponent;
