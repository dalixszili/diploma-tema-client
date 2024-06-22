import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Add as AddIcon } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import TableHeadRow, {
  getComparator,
  sortedRowData,
} from "../../helper/TableHeadRow";

const headerCells = [{ name: "name", label: "Szakosztály Neve" }];

function Categories() {
  // Változók inicializálása
  const [data, setData] = useState([{}]);
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
  });
  const [editId, setEditId] = useState(null);
  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/categories`
    );
    const responseData = response.data;

    setData(responseData);
  };

  const deleteData = async (id) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deletecategory/${id}`
    );
    const { msg } = response.data;
    alert(msg);
    fetchData();
  };

  const editData = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/categories/${id}`
    );
    setFormData(response.data);
    setEditId(id);
    setopenUpdateDialog(true);
  };

  const updateData = async () => {
    const { name } = formData;
    let errors = {};

    // Perform form validation
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    }
    if (name.trim().length <= 3) {
      errors.name = "A név legalább 3 karakterből kell álljon !";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updatecategory/${editId}`,
        formData
      );
      const { msg } = response.data;
      alert(msg);
      fetchData();
      handleClose();
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };
  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  const insertData = async () => {
    const { name } = formData;
    let errors = {};

    // Perform form validation
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 3) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newcategory`,
        formData
      );
      const { msg } = response.data;
      alert(msg);
      fetchData();
      handleClose();
    }
  };
  const handleClose = () => {
    setFormData({
      name: "",
    });
    setFormErrors({
      name: "",
    });
    setEditId(null);
    setopenUpdateDialog(false);
    setopenInsertDialog(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInsertClick = () => {
    setopenInsertDialog(true);
  };
  // Vége - függvények deklarálása

  return (
    <div>
      <Grid flexDirection={"column"}>
        <Tooltip title="Új szakosztály hozzáadása">
          <Fab
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              background: "#06d48f",
              color: "white",
              ":hover": { bgcolor: "#06f48f" },
            }}
            onClick={handleInsertClick}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* Insert Category  */}

        <Dialog
          fullWidth
          maxWidth="sm"
          open={openInsertDialog}
          onClose={handleClose}
        >
          <DialogTitle>Szakosztály hozzáadása</DialogTitle>
          <form
            sx={{ width: "100%", marginTop: 20 }}
            onSubmit={handleInsertSubmit}
          >
            <DialogContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="Név"
                id="name"
                label="Név"
                name="name"
                error={!!formErrors.name}
                helperText={formErrors.name}
                defaultValue={formData.name}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Bezárás
              </Button>
              <Button
                type="submit"
                // onClick={handleInsertSubmit}
                sx={{
                  color: "white",
                  backgroundColor: "#06d48f",
                  ":hover": { bgcolor: "#06f48f" },
                }}
              >
                Mentés
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* --- End Insert Category --- */}

        {/* Data Table  */}

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
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
                {/* <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Szakosztály Neve
                  </TableSortLabel>
                </TableCell> */}

                <TableHeadRow
                  data={headerCells}
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                />
                <TableCell align="center" style={{ width: "30%" }}>
                  Eszközök
                </TableCell>
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
                    <TableCell sx={{ fontSize: "1.25rem" }}>
                      {item.name}
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        variant="contained"
                        startIcon={<ModeEditIcon />}
                        sx={{
                          // width: "20vh",
                          // height: "3vh",
                          backgroundColor: "#06d48f",
                          ":hover": { bgcolor: "#06f48f" },
                        }}
                        onClick={() => editData(item.id)}
                      >
                        Szerkesztés
                      </Button>

                      {/* Update Category  */}

                      <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={openUpdateDialog}
                        onClose={handleClose}
                      >
                        <DialogTitle>Szakosztály Szerkesztése</DialogTitle>
                        <form
                          sx={{ width: "100%", marginTop: 20 }}
                          onSubmit={handleSubmit}
                        >
                          <DialogContent>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="name"
                              label="Név"
                              name="name"
                              error={!!formErrors.name}
                              helperText={formErrors.name}
                              defaultValue={formData.name}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Bezárás
                            </Button>
                            <Button
                              type="submit"
                              sx={{
                                color: "white",
                                backgroundColor: "#06d48f",
                                ":hover": { bgcolor: "#06f48f" },
                              }}
                            >
                              Mentés
                            </Button>
                          </DialogActions>
                        </form>
                      </Dialog>

                      {/* --- End Update Category --- */}

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
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default Categories;
