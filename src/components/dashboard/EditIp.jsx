import * as React from "react";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { editIp } from "../../services/iptable";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditIp({ label, fetchData, id }) {
  const [open, setOpen] = React.useState(false);
  const [labelEditable, setLableEditable] = React.useState(label);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        Edit
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
            <h1 style={{ opacity: 0.84 }}>Edit IP</h1>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            margin="normal"
            required
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
              setIsLoading(true);
              await editIp({ label: labelEditable, id });
              await fetchData();
              setIsLoading(false);
              toggleDrawer(false)();
            }}
          >
            {!isLoading && <span>Save Changes</span>}
            {isLoading && (
              <CircularProgress sx={{ mx: 2 }} size={20} color="info" />
            )}
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
