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
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UpdateProject from "./UpdateProject";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TruncateText from "../components_admin/Helpers/TruncateText";
import { extractTextFromHTML } from "../components_admin/Helpers/extractTextFromHTML ";
import { useSelector } from "react-redux";
import Login from "./Login";
import TeacherProjects from "./TeacherProjects.js";

function UserProjects({ user_id, deadlines }) {
  const URL_PROJECTS = `${process.env.REACT_APP_BACKEND_BASE_URL}/getuserprojects/${user_id}`;

  const [data, setData] = useState([]);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    category_id: 0,
  });
  const { user } = useSelector((state) => state.auth);

  // Felhasználó projektjeinek a lekérdezése
  const fetchData = async () => {
    const response = await axios.get(URL_PROJECTS);
    const responseData = response.data;
    setData(responseData);
  };

  // Új projekt gomb nyomására történő esemény
  const handleInsertClick = async () => {
    // Lekérdezzük a kategóriákat
    const responseCategories = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/categories`
    );

    // ha kaptunk kategóriákat, akkor beállítjuk implicitnbek az elsőt
    setCategories(responseCategories.data);
    if (responseCategories.data.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category_id: responseCategories.data[0].id,
      }));
    }
    // megnyitjuk a felugró ablakot
    setopenInsertDialog(true);
  };

  // felugró ablak bezárása, adatok visszaállítása
  const handleClose = () => {
    setFormData({
      name: "",
      category_id: categories.length > 0 ? categories.at(0).id : 0,
    });
    setFormErrors({
      name: "",
    });
    setopenInsertDialog(false);
  };

  const handleOpenEdit = async (itemData) => {
    // const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getuserprojects/${id}`);
    // console.log(itemData);
    setEditFormData(() => itemData);
    // setEditId(() => id);
    setopenEdit(true);
  };

  // Mentés
  const insertData = async () => {
    const { name } = formData;
    let errors = {};

    // Név mező validálás
    if (name.trim() === "") {
      errors.name = "Név mező kötelező !";
    } else {
      if (name.trim().length <= 3) {
        errors.name = "A név legalább 3 karakterből kell álljon !";
      }
    }
    setFormErrors(() => errors);
    if (Object.keys(errors).length === 0 && user_id) {
      const formBody = {
        title: formData.name,
        category_id: formData.category_id,
        user_id: user_id,
      };
      // console.log(formBody);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newproject`,
        formBody
      );
      if ((response.status = 200 && response.data)) {
        // console.log(response.data);
        setEditFormData(response.data.project);
        // setEditId(() => id);
        setopenEdit(true);
        handleClose();
        fetchData();
        const { msg } = response.data;
        alert(msg);
      } else {
        handleClose();
        alert("Sikertelen feltöltés !");
      }
    }
  };

  // Új dolgozat mentése
  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  // Dolgozat törlése
  const handleDeleteData = async (id) => {
    setopenDeleteDialog(true);
    setDeleteId(id);
  };

  const handleCloseDeleteDialog = () => {
    setopenDeleteDialog(false);
  };
  const handleDelete = async () => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deleteproject/${deleteId}`
    );
    fetchData();
    setopenDeleteDialog(false);
  };

  useEffect(() => {
    const initdata = async () => {
      const response = await axios.get(URL_PROJECTS);
      const responseData = response.data;
      setData(responseData);
      // console.log(responseData);
    };
    initdata();
  }, [URL_PROJECTS]);

  // Ha nincs bejelentkezve akkor bejelentkezési oldalra küldjük
  if (!user_id) return <Login />;
  // Ha zsűri akkor a zsűris dolgozatokat jelenítjük meg
  else
    return user.role === 3 && user_id && deadlines ? (
      <TeacherProjects user_id={user_id} deadlines={deadlines} />
    ) : // Ha diák
    user.role === 2 ? (
      // Ha dolgozat szerkesztésben van
      openEdit ? (
        <UpdateProject data={editFormData} deadlines={deadlines} />
      ) : (
        // Diák dolgozatainak listája
        <>
          {/* Törlés megerősítése */}
          <ConfirmDeleteDialog
            open={openDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            handleDelete={handleDelete}
          />
          {/* dolgozatok listája header */}
          <Grid container alignItems="row">
            <Grid item xs={6}>
              <h1>Dolgozatok</h1>
            </Grid>
            {Date.parse(deadlines.registration_date) >= new Date() && (
              <Grid item xs={6} textAlign="end">
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginTop: 3,
                    marginBottom: 3,
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                  onClick={handleInsertClick}
                >
                  Új dolgozat hozzáadása
                </Button>
              </Grid>
            )}
          </Grid>

          {/* Új projekt ablak  */}
          <Dialog open={openInsertDialog} onClose={handleClose}>
            <DialogTitle>Új projekt hozzáadása</DialogTitle>
            <form
              sx={{ width: "100%", marginTop: 20 }}
              autoComplete="off"
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
                <FormControl fullWidth required margin="normal">
                  <InputLabel id="pageSelectLabel">
                    Válasszon egy Kategóriát
                  </InputLabel>
                  <Select
                    labelId="pageSelectLabel"
                    id="pageSelect"
                    name="category_id"
                    value={formData.category_id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    {categories.map((cat, index) => (
                      <MenuItem key={index} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
          {/* --- Vége új projekt ablak --- */}

          {/* dolgozatok listája */}
          <Typography
            sx={{
              fontSize: "1.25rem",
              color: "white",
              background: "#2B405D",
              marginTop: "5%",
              padding: "1%",
            }}
          >
            Regisztrált dolgozataid listája
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
                  <TableCell>Cím</TableCell>
                  <TableCell>Kivonat</TableCell>
                  <TableCell>Kategória</TableCell>
                  <TableCell>Szerzők</TableCell>
                  {/* <TableCell>Vezető tanárok</TableCell> */}
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
                    {item.authors.map((i) => i.name).join(", ") ? (
                      <TableCell>
                        {item.authors.map((i) => i.name).join(", ")}
                      </TableCell>
                    ) : (
                      <TableCell sx={{ color: "red" }}>
                        [ Ismeretlen szerző ]
                      </TableCell>
                    )}
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        startIcon={<ModeEditIcon />}
                        size="small"
                        // component={NavLink}
                        sx={{
                          backgroundColor: "#06d48f",
                          ":hover": { bgcolor: "#06f48f" },
                        }}
                        // to={`${process.env.REACT_APP_BACKEND_BASE_URL}/project/${item.id}/edit`}
                        onClick={() => handleOpenEdit(item)}
                      >
                        Szerkesztés
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteData(item.id)}
                      >
                        Törlés
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
    ) : (
      ""
    );
}

export default UserProjects;
