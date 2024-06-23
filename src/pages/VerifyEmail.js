import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InputIcon from "@mui/icons-material/Input";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// const baseURL = "http://localhost:5000";

function VerifyEmail() {
  const [responseMsg, setResponseMsg] = useState("");
  const [responseError, setResponseError] = useState("");
  const params = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const verifyURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${params.id}/verify/${params.token}`;
        // console.log(verifyURL);
        const response = await axios.get(verifyURL);
        const data = response.data.msg;
        setResponseMsg(() => data);

        console.log(data);
      } catch (error) {
        if (error.response.data.msg) {
          setResponseError(() => error.response.data.msg);
        }
      }
    };
    verifyEmail();
  }, [params.id, params.token]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {responseMsg !== "" ? (
        <>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "green", mb: 2 }}
          />
          <Typography variant="h3">{responseMsg}</Typography>
          <Typography variant="h5">
            Gratulálunk! Sikeresen visszaigazolta az e-mail címét !
          </Typography>
          <Button
            startIcon={<InputIcon />}
            variant="contained"
            size="large"
            component={NavLink}
            to={"/?p=login"}
            sx={{
              marginTop: "5vh",
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
          >
            Bejelentkezés
          </Button>
        </>
      ) : (
        ""
      )}
      {responseError !== "" ? (
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
      ) : (
        ""
      )}
    </Box>
  );
}

export default VerifyEmail;
