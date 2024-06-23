import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InputIcon from "@mui/icons-material/Input";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  VisibilityOff,
  Visibility,
  ErrorOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [responseError, setResponseError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const params = useParams();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  const handleFormChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(formData);
    const password = formData.password;
    const confpassword = formData.confpassword;
    // console.log(respMessage);
    let aerror = "";
    try {
      if (!password.trim() || !confpassword.trim()) {
        aerror = "A jelszó nem állhat csak szóközből !";
        setErrorMsg(() => aerror);
      }

      if (password !== confpassword) {
        aerror = "A két jelszó nem egyezik !";
        setErrorMsg(() => aerror);
      }

      if (aerror.trim() === "") {
        const chanegPasswordURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${params.id}/resetpassword/${params.token}`;
        const response = await axios.patch(chanegPasswordURL, formData);

        if (response.status === 200 && response.data.msg) {
          setOpenDialog(() => true);
          setResponseMessage(() => response.data.msg);
        }

        // console.log(respMessage);
      }
    } catch (error) {
      if (error.response.data.msg) {
        setErrorMsg(() => error.response.data.msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verifyData = async () => {
      const verifyURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${params.id}/checkresetlink/${params.token}`;
      try {
        await axios.get(verifyURL);
        setResponseError("ok");
      } catch (error) {
        if (error.response.data.msg) {
          setResponseError(() => error.response.data.msg);
        }
      }
    };

    verifyData();
  }, [params]);

  return (
    <Box
      display={"flex"}
      minHeight={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      {responseError === "ok" ? (
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            width: "100%",
            margin: "0 auto",
            padding: 3,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          {/* Cím   */}
          <Typography variant="h4" component="center">
            {" "}
            Jelszó csere
          </Typography>

          {/* jelszó */}
          <TextField
            variant="outlined"
            margin="normal"
            autoComplete="off"
            required
            fullWidth
            name="password"
            label="Jelszó"
            type={showPassword ? "text" : "password"}
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

          {/* jelszó ismétlése */}
          <TextField
            variant="outlined"
            margin="normal"
            autoComplete="off"
            required
            fullWidth
            name="confpassword"
            label="Jelszó mégegyszer"
            type={showConfPassword ? "text" : "password"}
            id="confpassword"
            onChange={handleFormChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowConfPassword} edge="end">
                  {showConfPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          {errorMsg ? (
            <Typography
              component="p"
              variant="inherit"
              display="inline"
              color="red"
            >
              {errorMsg}
            </Typography>
          ) : (
            ""
          )}

          {/* regisztráció mentése */}
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
            {isLoading ? "Betöltés..." : "Mentés"}
          </Button>
        </Box>
      ) : (
        ""
      )}
      {responseError !== "ok" && responseError && (
        <>
          <ErrorOutlineOutlined sx={{ fontSize: 80, color: "red", mb: 2 }} />
          <Typography variant="h3">{responseError}</Typography>
          <Typography variant="h5">
            Kérjük adjon meg egy érvényes linket !
          </Typography>
          <Button
            startIcon={<HomeIcon />}
            variant="contained"
            size="large"
            component={NavLink}
            color="error"
            to={"/"}
            sx={{
              marginTop: "5vh",
            }}
          >
            Főoldal
          </Button>
        </>
      )}

      {/* Sikeres regsiztrálás utáni üzenet */}
      <Dialog open={openDialog} fullWidth maxWidth="sm">
        <DialogTitle>Sikeres Jelentkezés</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {responseMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<InputIcon />}
            variant="contained"
            component={Link}
            to={"/?p=login"}
            sx={{
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
            onClick={() => {
              setOpenDialog(() => false);
            }}
          >
            Bejelentkezés
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ResetPassword;
