import * as React from "react";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createIp } from "../../services/iptable";
import CircularProgress from "@mui/material/CircularProgress";

export default function CreateIp({ fetchData }) {
  const [open, setOpen] = React.useState(false);
  const [ip, setIp] = React.useState("");
  const [labelEditable, setLableEditable] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Create Ip
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        <div
          style={{
            padding: "12px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ opacity: 0.84 }}>Create New IP</h1>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="ip"
            label="IP"
            type="text"
            id="ip-label-edit"
            autoComplete="current-password"
            onChange={(e) => setIp(e.target.value)}
            sx={{ bgcolor: "white", width: 350 }}
            value={ip}
          />
          <TextField
            margin="normal"
            fullWidth
            name="ip-label"
            label="IP Label"
            type="text"
            id="ip-label-edit"
            autoComplete="current-password"
            onChange={(e) => setLableEditable(e.target.value)}
            sx={{ bgcolor: "white", width: 350 }}
            value={labelEditable}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={async () => {
              try {
                setIsLoading(true);
                const data = await createIp({ label: labelEditable, ip: ip });

                if (data.error) {
                  setError(data.error);
                }
                else {
                  toggleDrawer(false)();
                }
                fetchData();
                // toggleDrawer(false)();
              } catch (e) {
                console.log(e);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {!isLoading && <span>Save Changes</span>}
            {isLoading && (
              <CircularProgress sx={{ mx: 2 }} size={20} color="info" />
            )}
          </Button>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </Drawer>
    </div>
  );
}