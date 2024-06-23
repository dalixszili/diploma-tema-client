import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Add as AddIcon } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
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

function Sponsors() {
  // Változók inicializálása
  const [data, setData] = useState([{}]);
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website_url: "",
    logo_file: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    website_url: "",
  });
  const [editId, setEditId] = useState(null);
  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/sponsors`
    );
    const responseData = response.data;

    setData(responseData);
  };

  const deleteData = async (id) => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deletesponsor/${id}`
    );
    fetchData();
  };

  const editData = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/sponsors/${id}`
    );
    setFormData(response.data);
    setEditId(id);
    setopenUpdateDialog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  const updateData = async () => {
    const { name, website_url } = formData;
    let errors = {};
    const urlRegex = /^(https?:\/\/).{3,}?$/i;
    // Név mező validálás
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 2) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }
    // weboldal mező validálás
    const isValidURL = urlRegex.test(website_url);
    if (isValidURL === false) {
      // nem helyes a weboldal címe
      errors.website_url = "Adjon meg egy érvényes weboldal címet";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("website_url", formData.website_url);
      formDataToSend.append("logo_file", formData.logo_file);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updatesponsor/${editId}`,
        formDataToSend
      );
      fetchData();
      handleClose();
    }
  };

  const insertData = async () => {
    const { name, website_url } = formData;
    let errors = {};
    const urlRegex = /^(https?:\/\/).{3,}?$/i;
    // Név mező validálás
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 3) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }
    // weboldal mező validálás
    const isValidURL = urlRegex.test(website_url);
    if (isValidURL === false) {
      // nem helyes a weboldal címe
      errors.website_url = "Adjon meg egy érvényes weboldal címet";
    }
    setFormErrors(() => errors);
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("website_url", formData.website_url);
      formDataToSend.append("logo_file", formData.logo_file);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newsponsor`,
        formDataToSend
      );
      fetchData();
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      website_url: "",
      logo_file: "",
    });
    setFormErrors({
      name: "",
      website_url: "",
    });
    setEditId(null);
    setopenUpdateDialog(false);
    setopenInsertDialog(false);
  };

  const handleInsertClick = () => {
    setopenInsertDialog(true);
  };

  const handleArrowUpCommand = async (id) => {
    const dataSend = {
      arrow: 1,
    };
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/sponsors/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  const handleArrowDownCommand = async (id) => {
    const dataSend = {
      arrow: 0,
    };
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/sponsors/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Vége - függvények deklarálása

  return (
    <div>
      <Grid flexDirection={"column"}>
        <Tooltip title="Új szponzor hozzáadása">
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

        {/* Insert Sponsor  */}

        <Dialog open={openInsertDialog} onClose={handleClose}>
          <DialogTitle>Szponzor hozzáadása</DialogTitle>
          <form
            sx={{ width: "100%", marginTop: 20 }}
            enctype="multipart/form-data"
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

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="Website URL"
                id="website_url"
                label="Website"
                name="website_url"
                error={!!formErrors.website_url}
                helperText={formErrors.website_url}
                defaultValue={formData.website_url}
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
                type="file"
                required
                fullWidth
                label="Logó"
                id="logo_file"
                InputLabelProps={{ shrink: true }}
                name="logo_file"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
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

        {/* --- End Insert Sponsor --- */}

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
                <TableCell>Szponzor Neve</TableCell>
                <TableCell>Weboldal</TableCell>
                <TableCell>Logó</TableCell>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.website_url}</TableCell>
                  <TableCell>
                    <img
                      alt="Sponsors "
                      src={`${process.env.REACT_APP_BACKEND_BASE_URL}/images/${item.logo_file}`}
                      style={{ height: 40 }}
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

                    {/*   Update Sponosr  */}

                    <Dialog open={openUpdateDialog} onClose={handleClose}>
                      <DialogTitle>Szponzor Szerkesztése</DialogTitle>
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

                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Website URL"
                            id="website_url"
                            label="Website"
                            name="website_url"
                            error={!!formErrors.website_url}
                            helperText={formErrors.website_url}
                            defaultValue={formData.website_url}
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
                            type="file"
                            // required
                            fullWidth
                            label="Logó"
                            id="logo_file"
                            InputLabelProps={{ shrink: true }}
                            // value={`${process.env.REACT_APP_BACKEND_BASE_URL}/images/${formData.logo_file}`}
                            name="logo_file"
                            onChange={(e) => {
                              // console.log(formData)
                              setFormData({
                                ...formData,
                                [e.target.name]: e.target.files[0],
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

                    {/* --- End Update Sponsor --- */}

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteData(item.id)}
                    >
                      Törlés
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {item.order !== data.at(0).order && (
                      <IconButton onClick={() => handleArrowUpCommand(item.id)}>
                        <ArrowUpwardIcon />
                      </IconButton>
                    )}
                    {item.order !== data.at(-1).order && (
                      <IconButton
                        onClick={() => handleArrowDownCommand(item.id)}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default Sponsors;

import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Add as AddIcon } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
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

function Sponsors() {
  // Változók inicializálása
  const [data, setData] = useState([{}]);
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website_url: "",
    logo_file: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    website_url: "",
  });
  const [editId, setEditId] = useState(null);
  // Vége - Változók deklarálása

  // használt függvények deklarálása
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/sponsors");
    const responseData = response.data;

    setData(responseData);
  };

  const deleteData = async (id) => {
    await axios.patch(`http://localhost:5000/deletesponsor/${id}`);
    fetchData();
  };

  const editData = async (id) => {
    const response = await axios.get(`http://localhost:5000/sponsors/${id}`);
    setFormData(response.data);
    setEditId(id);
    setopenUpdateDialog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  const updateData = async () => {
    const { name, website_url } = formData;
    let errors = {};
    const urlRegex = /^(https?:\/\/).{3,}?$/i;
    // Név mező validálás
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 3) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }
    // weboldal mező validálás
    const isValidURL = urlRegex.test(website_url);
    if (isValidURL === false) {
      // nem helyes a weboldal címe
      errors.website_url = "Adjon meg egy érvényes weboldal címet";
    }
    await setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("website_url", formData.website_url);
      formDataToSend.append("logo_file", formData.logo_file);
      await axios.post(
        `http://localhost:5000/updatesponsor/${editId}`,
        formDataToSend
      );
      fetchData();
      handleClose();
    }
  };

  const insertData = async () => {
    const { name, website_url } = formData;
    let errors = {};
    const urlRegex = /^(https?:\/\/){2,}$/i;
    // Név mező validálás
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 3) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }
    // weboldal mező validálás
    const isValidURL = urlRegex.test(website_url);
    if (isValidURL === false) {
      // nem helyes a weboldal címe
      errors.website_url = "Adjon meg egy érvényes weboldal címet";
    }
    await setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("website_url", formData.website_url);
      formDataToSend.append("logo_file", formData.logo_file);
      await axios.post("http://localhost:5000/newsponsor", formDataToSend);
      fetchData();
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      website_url: "",
      logo_file: "",
    });
    setFormErrors({
      name: "",
      website_url: "",
    });
    setEditId(null);
    setopenUpdateDialog(false);
    setopenInsertDialog(false);
  };

  const handleInsertClick = () => {
    setopenInsertDialog(true);
  };

  const handleArrowUpCommand = async (id) => {
    const dataSend = {
      arrow: 1,
    };
    await axios.patch(
      `http://localhost:5000/sponsors/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  const handleArrowDownCommand = async (id) => {
    const dataSend = {
      arrow: 0,
    };
    await axios.patch(
      `http://localhost:5000/sponsors/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Vége - függvények deklarálása

  return (
    <div>
      <Grid flexDirection={"column"}>
        <Tooltip title="Új szponzor hozzáadása">
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

        {/* Insert Sponsor  */}

        <Dialog open={openInsertDialog} onClose={handleClose}>
          <DialogTitle>Szponzor hozzáadása</DialogTitle>
          <form
            sx={{ width: "100%", marginTop: 20 }}
            enctype="multipart/form-data"
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

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="Website URL"
                id="website_url"
                label="Website"
                name="website_url"
                error={!!formErrors.website_url}
                helperText={formErrors.website_url}
                defaultValue={formData.website_url}
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
                type="file"
                required
                fullWidth
                label="Logó"
                id="logo_file"
                InputLabelProps={{ shrink: true }}
                name="logo_file"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
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

        {/* --- End Insert Sponsor --- */}

        {/* Data Table  */}

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
                <TableCell>Szponzor Neve</TableCell>
                <TableCell>Weboldal</TableCell>
                <TableCell>Logó</TableCell>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.website_url}</TableCell>
                  <TableCell>
                    <img
                      alt="Sponsors "
                      src={`http://localhost:5000/images/${item.logo_file}`}
                      style={{ height: 40 }}
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

                    {/*   Update Sponosr  */}

                    <Dialog open={openUpdateDialog} onClose={handleClose}>
                      <DialogTitle>Szponzor Szerkesztése</DialogTitle>
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

                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Website URL"
                            id="website_url"
                            label="Website"
                            name="website_url"
                            error={!!formErrors.website_url}
                            helperText={formErrors.website_url}
                            defaultValue={formData.website_url}
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
                            type="file"
                            required
                            fullWidth
                            label="Logó"
                            id="logo_file"
                            InputLabelProps={{ shrink: true }}
                            name="logo_file"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [e.target.name]: e.target.files[0],
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

                    {/* --- End Update Sponsor --- */}

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteData(item.id)}
                    >
                      Törlés
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {item.order !== data.at(0).order && (
                      <IconButton onClick={() => handleArrowUpCommand(item.id)}>
                        <ArrowUpwardIcon />
                      </IconButton>
                    )}
                    {item.order !== data.at(-1).order && (
                      <IconButton
                        onClick={() => handleArrowDownCommand(item.id)}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default Sponsors;
