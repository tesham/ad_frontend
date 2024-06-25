import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAuditList } from "../../services/audit";
import LinearProgress from "@mui/material/LinearProgress";

export default function AuditTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const rows = await getAuditList();
      setRows(rows);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const formatDate = (date) => {
    let objectDate = new Date(date);

    return objectDate.toLocaleString("en-UK", {
      day: "numeric", // numeric, 2-digit
      month: "short", // numeric, 2-digit, long, short, narrow
      year: "numeric", // numeric, 2-digit
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginTop: -20, opacity: 0.84 }}>Audit log</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell align="left">Label</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.user}
                </TableCell>
                <TableCell align="left">{row.label}</TableCell>
                <TableCell align="left">{row.action}</TableCell>
                <TableCell align="left">{formatDate(row.created_at)}</TableCell>
              </TableRow>
            ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
