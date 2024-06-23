import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import axios from "axios";

function AccountAdmin({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  //   Mezők mentése változásra
  const handleFormChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    let aerror = "";

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      aerror = " Név mező kötelező és legelább 3 karaktert kell tartalmaznia !";
      setErrorMsg(() => aerror);
    }

    if (!formData.email.trim()) {
      aerror = " Email mező kötelező !";
      setErrorMsg(() => aerror);
    }

    if (aerror.trim() === "") {
      const changeDataURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/updateadmindata/${user.id}`;
      const response = await axios.patch(changeDataURL, formData);

      // if (response.status === 200 && response.data.msg) {
      // setOpenDialog(() => true);
      // setResponseMessage(() => response.data.msg);
      if (response.data.msg) {
        alert(response.data.msg);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}`
      );
      const responseData = response.data;
      setFormData(() => responseData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        borderRadius={"5px"}
        paddingBottom={"2vh"}
        // borderBottom={"1px solid #bbb"}
      >
        <Typography
          component={isMobile ? "h4" : "h3"}
          variant={isMobile ? "h4" : "h3"}
          marginTop={"5vh"}
        >
          Személyes adatok
        </Typography>

        <Typography component={"h6"} variant={"h6"} marginTop={"1.5vh"}>
          A felhasználói fiókhoz tartozó személyes adatok kezelése.
        </Typography>
        <Grid
          container
          spacing={isMobile ? 0 : 2}
          marginTop={"3vh"}
          maxWidth={"100vw"}
          display={"inline-flex"}
        >
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmitUpdate}
              sx={{
                maxWidth: "90%",
                width: "100%",
                margin: "0 auto",
                padding: "3vh",
                borderRadius: 5,
                boxShadow: "5px 5px 10px #ccc",
                ":hover": {
                  boxShadow: "10px 10px 20px #ccc",
                },
              }}
            >
              {/* teljes név */}
              <TextField
                sx={{ marginTop: 2 }}
                type="text"
                margin="normal"
                autoComplete="off"
                variant="outlined"
                color="primary"
                label="Teljes név"
                name="name"
                id="name"
                fullWidth
                required
                value={formData.name ? formData.name : ""}
                onChange={handleFormChange}
              />
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
                value={formData.email ? formData.email : ""}
                onChange={handleFormChange}
              />

              <TextField
                sx={{ marginTop: 2 }}
                type="text"
                variant="outlined"
                color="primary"
                label="Egyetem"
                name="university"
                id="university"
                fullWidth
                value={formData.university ? formData.university : ""}
                //   required
                onChange={handleFormChange}
              />

              <TextField
                sx={{ marginTop: 2 }}
                type="text"
                variant="outlined"
                color="primary"
                label="Kar"
                name="employment"
                id="employment"
                fullWidth
                value={formData.employment ? formData.employment : ""}
                //   required
                onChange={handleFormChange}
              />

              <TextField
                sx={{ marginTop: 2 }}
                type="text"
                variant="outlined"
                color="primary"
                label="Beosztás"
                name="job_title"
                id="job_title"
                fullWidth
                value={formData.job_title ? formData.job_title : ""}
                //   required
                onChange={handleFormChange}
              />

              {/*  modosítás mentése */}
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
                {/* {isLoading ? "Betöltés..." : "Regisztráció"} */}
                Mentés
              </Button>
              {/* </FormControl> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              autoComplete="off"
              //   onSubmit={handleSubmit}
              sx={{
                maxWidth: isMobile ? "90%" : "75%",
                width: "100%",
                margin: "0 auto",
                padding: "3vh",
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
                //   onChange={handleFormChange}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {/* új jelszó */}
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                name="newpassword"
                label="Új Jelszó"
                type={showNewPassword ? "text" : "password"}
                id="newpassword"
                //   onChange={handleFormChange}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowNewPassword} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                label="Új Jelszó mégegyszer"
                type={showConfPassword ? "text" : "password"}
                id="confpassword"
                //   onChange={handleFormChange}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handleClickShowConfPassword}
                      edge="end"
                    >
                      {showConfPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
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
                {/* {isLoading ? "Betöltés..." : "Mentés"} */}
                Mentés
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AccountAdmin;
