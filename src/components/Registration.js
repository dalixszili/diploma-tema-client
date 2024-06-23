import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { MailOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import InputIcon from "@mui/icons-material/Input";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

const registrationURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/register`;
const dateURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/activesettings`;

function Registration({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [responseError, setResponseError] = useState();
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const [deadlines, setDeadlines] = useState({});

  // const dispatch = useDispatch();
  const { user, isSucces } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  //   Mezők mentése változásra
  const handleFormChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  // Mentésre kattintás
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(formData);
    const name = formData.firstname + " " + formData.lastname;
    const email = formData.email;
    const password = formData.password;
    const confpassword = formData.confpassword;

    try {
      const response = await axios.post(registrationURL, {
        name: name,
        email: email,
        password: password,
        confpassword: confpassword,
      });
      // dispatch(LoginUser({ email, password }));
      setOpenDialog(() => true);
      setResponseMessage(() => response.data.msg);
    } catch (error) {
      setResponseError(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }

    // console.log(msg);
    // const { msg } = response.data;
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
    // Form létrehozása

    <>
      {console.log(deadlines)}
      {Date.parse(deadlines.registration_date) >= new Date() ? (
        <form
          autoComplete="off"
          sx={{ width: "100%", marginTop: 20 }}
          onSubmit={handleSubmit}
        >
          <FormControl
            sx={{
              maxWidth: 400,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
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
            {/* Cím   */}
            <Typography variant="h4" component="center">
              {" "}
              Regisztráció
            </Typography>
            {/* Kereszt és csalad név */}
            <Stack spacing={2} direction="row" sx={{ marginTop: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Család név"
                name="firstname"
                id="firstname"
                fullWidth
                required
                onChange={handleFormChange}
                autoFocus
              />
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Kereszt név"
                name="lastname"
                id="lastname"
                fullWidth
                required
                onChange={handleFormChange}
              />
            </Stack>
            {/* email */}
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
              label="Jelszó ismétlése"
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

            {responseError ? (
              <Typography
                component="p"
                variant="inherit"
                display="inline"
                color="red"
              >
                {responseError}
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
              {isLoading ? "Betöltés..." : "Regisztráció"}
            </Button>

            <Typography component="p" variant="inherit" display="inline">
              Van már felhasználója ?
              <Typography
                variant="p"
                noWrap
                component={NavLink}
                to="/?p=login"
                color="GrayText"
                sx={{ textDecoration: "none" }}
                underline="none"
                onClick={(e) => {
                  setPage(<Login setPage={setPage} />);
                }}
              >
                {" "}
                Belépés
              </Typography>
            </Typography>
          </FormControl>
        </form>
      ) : (
        Object.keys(deadlines).length !== 0 && (
          <Typography
            component={"h3"}
            variant="h3"
            color={"red"}
            sx={{
              // maxWidth: 400,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
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
            A regisztrációs időszak lejárt
          </Typography>
        )
      )}
      {/* Sikeres regsiztrálás utáni üzenet */}
      <Dialog open={openDialog}>
        <DialogTitle>Sikeres Jelentkezés</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {responseMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            // width: "100%",
          }}
        >
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
              setPage(<Login setPage={setPage} />);
            }}
          >
            Bejelentkezés
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Registration;
