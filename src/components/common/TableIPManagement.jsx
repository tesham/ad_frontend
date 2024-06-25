import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getIpList } from "../../services/iptable";
import LinearProgress from "@mui/material/LinearProgress";
import EditIp from "../dashboard/EditIp";
import CreateIp from "../dashboard/CreateIp";

export default function TableIPManagement() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const rows = await getIpList();
      setRows(rows);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  async function fetchIpData() {
    setIsLoading(true);
    const rows = await getIpList();
    setRows(rows);
    setIsLoading(false);
  }

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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "-20px 0 16px",
        }}
      >
        <h1 style={{ margin: 0, opacity: 0.84 }}>Dashboard</h1>
        <CreateIp fetchData={fetchIpData} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id.</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.created_by}</TableCell>
                <TableCell>{formatDate(row.create_time)}</TableCell>
                <TableCell>{formatDate(row.update_time)}</TableCell>
                <TableCell align="center">
                  <EditIp
                    label={row.label}
                    id={row.id}
                    fetchData={fetchIpData}
                  />
                </TableCell>
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
    </>
  );
}