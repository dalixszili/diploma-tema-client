import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/AuthSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSucces, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    setErrorMsg(() => "");
    event.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    if (user && user.role === 1) {
      navigate("/admin");
    }
    if (user && user.role !== 1) {
      setErrorMsg(() => "Belépés megtagadva !");
    }
    dispatch(reset());
  }, [user, isSucces, dispatch, navigate]);

  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        marginTop: 15,
      }}
    >
      <Typography component="h1" variant="h4">
        Bejelentkezés
      </Typography>
      {isError && (
        <Typography component={"p"} variant="body" style={{ color: "red" }}>
          {message}
        </Typography>
      )}

      {errorMsg && (
        <Typography component={"p"} variant="body" style={{ color: "red" }}>
          {errorMsg}
        </Typography>
      )}
      <form sx={{ width: "100%", marginTop: 20 }} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          onChange={handleEmailChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="true"
          name="password"
          label="Jelszó"
          type="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: 3,
            marginBottom: 3,
            backgroundColor: "#06d48f",
            ":hover": { bgcolor: "#06f48f" },
          }}
        >
          {isLoading ? "Betöltés..." : "Bejelentkezés"}
        </Button>
      </form>
    </Paper>
  );
}

export default Login;
