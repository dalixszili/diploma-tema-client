import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import TruncateText from "./Helpers/TruncateText";
import { extractTextFromHTML } from "./Helpers/extractTextFromHTML ";

function Pagelist() {
  // Változók inicializálása
  const baseurl = "/admin";

  const [data, setData] = useState([{}]);

  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/pages`
    );
    const responseData = response.data;

    setData(responseData);
  };
  const deleteData = async (id) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deletepage/${id}`
    );

    const { msg } = response.data;
    alert(msg);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Vége - függvények deklarálása

  return (
    <Box>
      <Typography variant={"body"} component={"h1"} paddingTop={3}>
        Oldalak
      </Typography>

      <Grid container direction="row">
        <Grid item xs={6} alignContent={"center"}>
          <Typography variant={"body"} component={"h2"}>
            A weboldal szöveges oldalainak kezelése.
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"}>
          <Button
            variant="contained"
            component={Link}
            to={`${baseurl}/addpage`}
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
          >
            Új oldal hozzáadása
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid black",
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)",
                },
              }}
            >
              <TableCell>Oldal Címe</TableCell>
              <TableCell>Oldal Kivonata</TableCell>
              <TableCell>Permalink</TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
                Eszközök
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  ":hover": { bgcolor: "#edfff2" },
                }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <TruncateText
                    text={extractTextFromHTML(item.content)}
                    limit={50}
                  />
                </TableCell>
                {/* <TableCell>{item.content}</TableCell> */}
                <TableCell>{item.permalink}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    startIcon={<ModeEditIcon />}
                    component={NavLink}
                    to={`${baseurl}/page/${item.id}/edit`}
                    sx={{
                      backgroundColor: "#06d48f",
                      ":hover": { bgcolor: "#06f48f" },
                    }}
                  >
                    Szerkesztés
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteData(item.id)}
                  >
                    Törlés
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Pagelist;

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import TruncateText from "./Helpers/TruncateText";
import { extractTextFromHTML } from "./Helpers/extractTextFromHTML ";

function Pagelist() {
  // Változók inicializálása
  const baseurl = "/admin";

  const [data, setData] = useState([{}]);

  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/pages");
    const responseData = response.data;

    setData(responseData);
  };
  const deleteData = async (id) => {
    const response = await axios.patch(
      `http://localhost:5000/deletepage/${id}`
    );

    const { msg } = response.data;
    alert(msg);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Vége - függvények deklarálása

  return (
    <div
      style={{
        marginTop: 100,
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
      }}
    >
      <h1>Oldalak</h1>

      <h3>A weboldal szöveges oldalainak kezelése.</h3>

      <div
        style={{
          position: "absolute",
          top: "120px",
          right: "10%",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to={`${baseurl}/addpage`}
          startIcon={<AddIcon />}
          style={{ textTransform: "none" }}
          sx={{
            marginTop: 3,
            marginBottom: 3,
            backgroundColor: "#06d48f",
            ":hover": { bgcolor: "#06f48f" },
          }}
        >
          Új oldal hozzáadása
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid black",
                "& th": {
                  fontSize: "1.25rem",
                  color: "rgba(96, 96, 96)",
                },
              }}
            >
              <TableCell>Oldal Címe</TableCell>
              <TableCell>Oldal Kivonata</TableCell>
              <TableCell>Permalink</TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
                Eszközök
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  ":hover": { bgcolor: "#edfff2" },
                }}
              >
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <TruncateText
                    text={extractTextFromHTML(item.content)}
                    limit={50}
                  />
                </TableCell>
                {/* <TableCell>{item.content}</TableCell> */}
                <TableCell>{item.permalink}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    startIcon={<ModeEditIcon />}
                    component={Link}
                    to={`${baseurl}/page/${item.id}/edit`}
                    sx={{
                      backgroundColor: "#06d48f",
                      ":hover": { bgcolor: "#06f48f" },
                    }}
                  >
                    Szerkesztés
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteData(item.id)}
                  >
                    Törlés
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Pagelist;
