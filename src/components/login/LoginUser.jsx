import { Box, Button, Container, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../services/login";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = (e) => {
    const { value, name } = e.target;
    setFormValues(() => {
      return {
        ...formValues,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: "rgba(255,255,255,0.8)", borderRadius: 2 }}
      >
        <Box sx={{ p: 4 }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={getData}
              sx={{ bgcolor: "white" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={getData}
              sx={{ bgcolor: "white" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                textTransform: "none",
              }}
              onClick={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const token = await login({
                    username: formValues.email,
                    password: formValues.password,
                  });
                  if (token.error) {
                    setError(token.error);
                  } else {
                    localStorage.setItem("ip-tokens-access", token.access);
                    localStorage.setItem("ip-tokens-refresh", token.refresh);
                    navigate("/");
                  }
                } catch (e) {
                  setError(e.response.data.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {!loading && <span>Sign In</span>}
              {loading && (
                <CircularProgress sx={{ mx: 2 }} size={20} color="info" />
              )}
            </Button>
            {!!error && <p style={{ color: "red" }}>{error}</p>}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LoginUser;