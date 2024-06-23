import {
  Button,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TruncateText from "../components_admin/Helpers/TruncateText";
import { extractTextFromHTML } from "../components_admin/Helpers/extractTextFromHTML ";
import TableHeadRow, {
  getComparator,
  sortedRowData,
} from "../helper/TableHeadRow";
// import { useSelector } from "react-redux";

// Rendezhető oszlop
const headerCells = [
  { name: "title", label: "Cím" },
  { name: "abstractName", label: "Kivonat" },
  { name: "categoryName", label: "Kategória" },
];

function TeacherProjects({ user_id }) {
  const URL_PROJECTS = `${process.env.REACT_APP_BACKEND_BASE_URL}/getprojectbyjudgecategory/${user_id}`;
  const [data, setData] = useState([]);
  const [openAbstract, setOpenAbstract] = useState(false);
  const [abstractData, setAbstractData] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");

  // felugró ablak bezárása, adatok visszaállítása
  const handleClose = () => {
    setAbstractData("");
    setOpenAbstract(false);
  };

  const handleOpenAbstract = async (itemAbstract) => {
    setAbstractData(() => itemAbstract);
    setOpenAbstract(true);
  };

  const handleDownloadFile = async (url, filenamedb) => {
    const response = await axios.get(url, {
      responseType: "blob",
    });

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const urldownload = window.URL.createObjectURL(pdfBlob);
    const tempLink = document.createElement("a");
    tempLink.href = urldownload;
    tempLink.setAttribute("download", `${filenamedb}`);

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(urldownload);
  };

  useEffect(() => {
    const initdata = async () => {
      const response = await axios.get(URL_PROJECTS);
      const responseData = response.data;
      setData(responseData);
      // setData({ ...data, categoryName: responseData.category.name });
      const newdata = responseData.map((o) => ({
        ...o,
        categoryName: o.category.name,
        abstractName: o.abstract ? o.abstract : "zzzzzzzzz",
      }));
      setData(() => newdata);
    };
    initdata();
  }, [URL_PROJECTS]);

  return (
    <>
      <Grid container alignItems="row">
        <Grid item xs={6}>
          <h1>Dolgozatok</h1>
        </Grid>
      </Grid>

      <Typography
        sx={{
          fontSize: "1.25rem",
          color: "white",
          background: "#2B405D",
          marginTop: "5%",
          padding: "1%",
        }}
      >
        Regisztrált dolgozatok listája
      </Typography>
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
              {/* <TableCell>Weblap címe</TableCell> */}
              <TableHeadRow
                data={headerCells}
                order={order}
                setOrder={setOrder}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
              <TableCell>Szerzők</TableCell>
              <TableCell>Irányító tanárok</TableCell>
              {/* <TableCell>Vezető tanárok</TableCell> */}
              <TableCell align="center">Eszközök</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRowData(data, getComparator(order, orderBy)).map(
              (item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    ":hover": { bgcolor: "#edfff2" },
                  }}
                >
                  <TableCell>{item.title}</TableCell>
                  {item.abstract ? (
                    <TableCell>
                      <TruncateText
                        text={extractTextFromHTML(item.abstract)}
                        limit={50}
                      />
                    </TableCell>
                  ) : (
                    <TableCell sx={{ color: "red" }}>
                      [ Üres kivonat ]
                    </TableCell>
                  )}

                  {item.category ? (
                    <TableCell>{item.category.name}</TableCell>
                  ) : (
                    <TableCell sx={{ color: "red" }}>
                      [ Törölt kategória ]
                    </TableCell>
                  )}
                  <TableCell>
                    {item.authors.map((i) => i.name).join(", ")}
                  </TableCell>

                  <TableCell>
                    {item.teachers.map((i) => i.name).join(", ")}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      disabled={!item.abstract}
                      size="small"
                      sx={{
                        background: "#2B405D",
                      }}
                      onClick={() =>
                        item.abstract ? handleOpenAbstract(item.abstract) : ""
                      }
                    >
                      Kivonat
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      disabled={!item.project_file}
                      sx={{
                        marginLeft: "2vw",
                        marginRight: "2vw",
                        backgroundColor: "#06d48f",
                        ":hover": { bgcolor: "#06f48f" },
                      }}
                      startIcon={<ArrowDownwardIcon />}
                      onClick={() =>
                        handleDownloadFile(
                          `${process.env.REACT_APP_BACKEND_BASE_URL}/projects/${item.project_file_saved}`,
                          item.project_file
                        )
                      }
                    >
                      Letöltés
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Kívonat megnyitása */}
      <Dialog open={openAbstract} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Kívonat</DialogTitle>
        <DialogContent>
          <Typography
            component={"pre"}
            sx={{ fontFamily: "Times New Roman, serif" }}
          >
            {abstractData}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
            startIcon={<HighlightOffOutlinedIcon />}
            onClick={handleClose}
          >
            Bezárás
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeacherProjects;
