import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function General() {
  // Változók inicializálása

  const [data, setData] = useState([{}]);
  const currentYear = new Date().getFullYear();
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    website_title: "",
    registration_date: new Date().toISOString().slice(0, 16),
    abstract_date: new Date().toISOString().slice(0, 16),
    project_date: new Date().toISOString().slice(0, 16),
    curr_year: currentYear,
  });
  const [formErrors, setFormErrors] = useState({
    website_title: "",
    curr_year: "",
  });

  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/settings");
    const responseData = response.data;
    setData(responseData);
  };

  const handleInsertClick = () => {
    setFormData({
      website_title: "",
      registration_date: new Date().toISOString().slice(0, 16),
      abstract_date: new Date().toISOString().slice(0, 16),
      project_date: new Date().toISOString().slice(0, 16),
      curr_year: currentYear,
    });
    setopenInsertDialog(true);
  };

  const editData = async (id) => {
    const response = await axios.get(`http://localhost:5000/settings/${id}`);
    setFormData(response.data);
    await setEditId(id);
    setopenUpdateDialog(true);
  };

  const handleRadioChange = async (id, isactive) => {
    if (isactive === 0) {
      const response = await axios.patch(
        `http://localhost:5000/setactivesettings/${id}`
      );
      const { msg } = response.data;
      alert(msg);
      fetchData();
    }
  };
  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  const updateData = async () => {
    const { website_title, curr_year } = formData;
    let errors = {};

    // Perform form validation
    if (website_title.trim() === "") {
      errors.website_title = "Ezt a mezőt kötelező kitölteni!";
    } else {
      if (website_title.trim().length <= 3) {
        errors.website_title = "A cím legalább 3 karakterből kell álljon !";
      }
    }
    if (curr_year < currentYear) {
      errors.curr_year = `Az év nem lehet kisebb, mint ${currentYear}`;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `http://localhost:5000/updatesettings/${editId}`,
        formData
      );
      const { msg } = response.data;
      alert(msg);
      fetchData();
      handleClose();
    }
  };

  const insertData = async () => {
    const { website_title, curr_year } = formData;
    let errors = {};

    // Perform form validation
    if (website_title.trim() === "") {
      errors.website_title = "Ezt a mezőt kötelező kitölteni!";
    } else {
      if (website_title.trim().length <= 3) {
        errors.website_title = "A cím legalább 3 karakterből kell álljon !";
      }
    }
    if (curr_year < currentYear) {
      errors.curr_year = `Az év nem lehet kisebb, mint ${currentYear}`;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        "http://localhost:5000/newsettings",
        formData
      );
      const { msg } = response.data;
      alert(msg);
      fetchData();
      handleClose();
    }
  };

  const deleteData = async (id) => {
    const response = await axios.patch(
      `http://localhost:5000/deletesettings/${id}`
    );
    const { msg } = response.data;
    alert(msg);
    fetchData();
  };
  const handleClose = () => {
    setFormData({
      website_title: "",
      registration_date: new Date().toISOString().slice(0, 16),
      abstract_date: new Date().toISOString().slice(0, 16),
      project_date: new Date().toISOString().slice(0, 16),
      curr_year: currentYear,
    });
    setFormErrors({
      name: "",
    });

    setopenInsertDialog(false);
    setopenUpdateDialog(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid flexDirection={"column"}>
        <Tooltip title="Új Beállítások hozzáadása">
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

        {/* Insert Settings  */}

        <Dialog open={openInsertDialog} onClose={handleClose}>
          <DialogTitle>Beállítás hozzáadása</DialogTitle>
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
                placeholder="Weblap címe"
                id="website_title"
                label="Weblap címe"
                name="website_title"
                error={!!formErrors.website_title}
                helperText={formErrors.website_title}
                defaultValue={formData.website_title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                type="datetime-local"
                required
                fullWidth
                id="registration_date"
                label="Regisztráció dátuma"
                InputLabelProps={{ shrink: true }}
                name="registration_date"
                value={formData.registration_date}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="datetime-local"
                required
                fullWidth
                id="abstract_date"
                label="Absztrakt dátuma"
                InputLabelProps={{ shrink: true }}
                name="abstract_date"
                value={formData.abstract_date}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="datetime-local"
                required
                fullWidth
                id="project_date"
                label="Projekt dátuma"
                InputLabelProps={{ shrink: true }}
                name="project_date"
                value={formData.project_date}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="curr_year"
                label="Év "
                type="number"
                error={!!formErrors.curr_year}
                helperText={formErrors.curr_year}
                InputProps={{ inputProps: { min: currentYear, max: 2040 } }}
                id="curr_year"
                defaultValue={formData.curr_year}
                onChange={(e) => {
                  if (e.target.value > currentYear && e.target.value < 2040) {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    });
                  }
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

        {/* --- End Insert Settings --- */}

        {/* Data Table  */}

        <Grid item>
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
                  <TableCell>Weblap címe</TableCell>
                  <TableCell>Regisztráció dátum</TableCell>
                  <TableCell>Absztrakt dátum</TableCell>
                  <TableCell>Projekt dátum</TableCell>
                  <TableCell>Év</TableCell>
                  <TableCell>Aktiv</TableCell>
                  <TableCell align="center">Eszközök</TableCell>
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
                    <TableCell>{item.website_title}</TableCell>

                    <TableCell>{item.registration_date}</TableCell>

                    <TableCell>{item.abstract_date}</TableCell>

                    <TableCell>{item.project_date}</TableCell>

                    <TableCell>{item.curr_year}</TableCell>

                    <TableCell>
                      <Radio
                        checked={!!item.is_active}
                        onChange={() =>
                          handleRadioChange(item.id, item.is_active)
                        }
                        name="radio-button"
                        color="primary"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        variant="contained"
                        startIcon={<ModeEditIcon />}
                        sx={{
                          backgroundColor: "#06d48f",
                          ":hover": { bgcolor: "#06f48f" },
                        }}
                        onClick={() => editData(item.id)}
                      >
                        Szerkesztés
                      </Button>

                      {/* Update Settings  */}
                      <Dialog open={openUpdateDialog} onClose={handleClose}>
                        <DialogTitle>Beállítások Szerkesztése</DialogTitle>
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
                              placeholder="Weblap címe"
                              id="website_title"
                              label="Weblap címe"
                              name="website_title"
                              error={!!formErrors.website_title}
                              helperText={formErrors.website_title}
                              defaultValue={formData.website_title}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />

                            <TextField
                              variant="outlined"
                              margin="normal"
                              type="datetime-local"
                              required
                              fullWidth
                              id="registration_date"
                              label="Regisztráció dátuma"
                              InputLabelProps={{ shrink: true }}
                              name="registration_date"
                              value={formData.registration_date}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              type="datetime-local"
                              required
                              fullWidth
                              id="abstract_date"
                              label="Absztrakt dátuma"
                              InputLabelProps={{ shrink: true }}
                              name="abstract_date"
                              value={formData.abstract_date}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              type="datetime-local"
                              required
                              fullWidth
                              id="project_date"
                              label="Projekt dátuma"
                              InputLabelProps={{ shrink: true }}
                              name="project_date"
                              value={formData.project_date}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="curr_year"
                              label="Év "
                              type="number"
                              error={!!formErrors.curr_year}
                              helperText={formErrors.curr_year}
                              InputProps={{
                                inputProps: { min: currentYear, max: 2040 },
                              }}
                              id="curr_year"
                              defaultValue={formData.curr_year}
                              onChange={(e) => {
                                if (
                                  e.target.value > currentYear &&
                                  e.target.value < 2040
                                ) {
                                  setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value,
                                  });
                                }
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

                      {/* --- End Update Settings --- */}

                      {item.is_active === 0 && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deleteData(item.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default General;
