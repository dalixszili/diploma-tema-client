import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../features/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility, MailOutline } from "@mui/icons-material";
import Registration from "./Registration";
import axios from "axios";

const dateURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/activesettings`;

function Login({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { user, isSucces, isLoading } = useSelector((state) => state.auth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [deadlines, setDeadlines] = useState({});

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const email = formData.email;

    // mező validálás
    if (email.trim() === "") {
      setErrorMsg(() => "E-mail mező kötelező !");
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim())) {
        setErrorMsg(() => "A megadott e-mail cím nem helyes !");
      } else {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/users/resetpasswordrequest`,
            { email: email }
          );
          setOpenDialog(() => true);
          setResponseMessage(() => response.data.msg);
        } catch (error) {
          setErrorMsg(() => error.response.data.msg);
        }
      }
    }
  };

  const handleFormChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    const email = formData.email;
    const password = formData.password;
    const respMessage = await dispatch(LoginUser({ email, password }));
    // console.log(respMessage);
    if (respMessage.error && respMessage.payload)
      setErrorMsg(() => respMessage.payload);
  };

  useEffect(() => {
    if (user && isSucces) {
      navigate("/?p=documents");
    }
    const getdeadlines = async () => {
      const dateresponse = await axios.get(dateURL);
      setDeadlines(() => dateresponse.data);
    };
    getdeadlines();
  }, [user, isSucces, navigate]);
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 5,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography variant="h4">Bejelentkezés</Typography>
      {/* {isError && <p style={{ color: "red" }}>{message}</p>} */}
      <form
        autoComplete="off"
        sx={{ width: "100%", marginTop: 20 }}
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          autoComplete="off"
          margin="normal"
          type="email"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          onChange={handleFormChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          autoComplete="off"
          required
          fullWidth
          name="password"
          label="Jelszó"
          type={showPassword ? "text " : "password"}
          id="password"
          onChange={handleFormChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button
          variant="text"
          // to="/?p=register"
          // color="GrayText"
          // marginTop={"20px"}
          sx={{
            textDecoration: "none",
            textTransform: "none",
            fontWeight: "bold",
            width: "auto",
            color: "GrayText",
            padding: "0",
            marginTop: "3%",
          }}
          // underline="none"
          onClick={handleResetPassword}
        >
          {" "}
          Elfelejtettem a jelszavam
        </Button>
        {errorMsg !== "" ? (
          <Typography
            component="p"
            variant="inherit"
            // display="inline"
            paddingTop={2}
            color="red"
          >
            {errorMsg}
          </Typography>
        ) : (
          ""
        )}

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

        {/* <Box component="div"> */}
        {Date.parse(deadlines.registration_date) >= new Date() &&
        Object.keys(deadlines).length !== 0 ? (
          <>
            <Typography component="p" variant="inherit" display="inline">
              Nincs még felhasználója ?
            </Typography>

            <Typography
              variant="p"
              noWrap
              component={NavLink}
              to="/?p=register"
              color="GrayText"
              sx={{ textDecoration: "none" }}
              underline="none"
              onClick={(e) => {
                setPage(<Registration setPage={setPage} />);
              }}
            >
              {" "}
              Jelentkezés
            </Typography>
          </>
        ) : (
          ""
        )}
      </form>

      {/* Sikeres regsiztrálás utáni üzenet */}
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          setOpenDialog(() => false);
        }}
      >
        <DialogTitle>Jelszó visszaállítása</DialogTitle>
        <DialogContent>
          <DialogContentText>{responseMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<MailOutline />}
            variant="contained"
            component={NavLink}
            target="blank"
            to={"https://mail.google.com/"}
            autoFocus
          >
            Leveleim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;
