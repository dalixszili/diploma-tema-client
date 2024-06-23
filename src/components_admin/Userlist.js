import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableHeadRow, {
  getComparator,
  sortedRowData,
} from "../helper/TableHeadRow";

const headerCells = [
  { name: "name", label: "Név" },
  { name: "email", label: "E-mail" },
  { name: "university", label: "Egyetem" },
  { name: "department", label: "Kar" },
  { name: "profile", label: "Szak" },
  { name: "year", label: "Évfolyam" },
];

function Userlist() {
  const [data, setData] = useState([{}]);
  const [openstud, setOpenstud] = useState(false);
  const [openteacher, setOpenteacher] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    department: "",
    profile: "",
    year: 0,
    role: "",
    employment: "",
    job_title: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users`
    );
    const responseData = response.data;
    const newData = responseData.map((obj) => {
      if (obj.role === 2) {
        return { ...obj, role: "Diák" };
      } else {
        return { ...obj, role: "Zsűri" };
      }
    });
    // setData(newData);
    // const response = await axios.get("http://localhost:5000/users");
    // const responseData = response.data;
    // const newData = responseData.map((obj) => {
    // if (obj.role === 2) {
    // return { ...obj, role: "Diák" };
    // } else {
    // return { ...obj, role: "Zsűri" };
    // }
    // });
    setData(newData);
  };

  const deleteData = async (id) => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/delete/${id}`
    );
    await axios.patch(`http://localhost:5000/users/delete/${id}`);
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/delete/${id}`
    );
    fetchData();
  };
  // () => editData(item.id)
  const editData = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${id}`
    );
    setFormData(response.data);
    setEditId(id);
    handleOpen(response.data.role);
  };

  const updateData = async () => {
    console.log(formData);
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${editId}`,
      formData
    );
    fetchData();
    handleClose();
    setFormData({
      name: "",
      email: "",
      university: "",
      department: "",
      profile: "",
      year: 0,
      role: 0,
      employment: "",
      job_title: "",
    });
    setEditId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (role) => {
    if (role === 2) setOpenstud(true);
    else setOpenteacher(true);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      university: "",
      department: "",
      profile: "",
      year: 0,
      role: 0,
      employment: "",
      job_title: "",
    });
    setEditId(null);
    setOpenstud(false);
    setOpenteacher(false);
  };

  return (
    <Box>
      <Typography variant={"body"} component={"h1"} paddingTop={3}>
        Felhasználók
      </Typography>

      <Grid container direction="row">
        <Grid item xs={6} alignContent={"center"}>
          <Typography variant={"body"} component={"h2"}>
            Diákok és zsűritagok kezelése
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"}>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            style={{ textTransform: "none" }}
            // onClick={handleInsertClick}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
          >
            Zsűritag meghívása
          </Button>
        </Grid>
      </Grid>

      <Grid
        flexDirection={"column"}
        // sx={{ width: "80%" }}
      >
        <Grid item xs={12}></Grid>
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
                <TableHeadRow
                  data={headerCells}
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                />

                <TableCell>Jog</TableCell>
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.university}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.profile}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
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

                      {/* Update Student  */}

                      <Dialog open={openstud} onClose={handleClose}>
                        <DialogTitle>Felhasználó Szerkesztése</DialogTitle>
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
                              id="email"
                              label="E-mail:"
                              name="email"
                              defaultValue={formData.email}
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
                              name="university"
                              label="Egyetem:"
                              id="university"
                              defaultValue={formData.university}
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
                              name="department"
                              label="Kar:"
                              id="department"
                              defaultValue={formData.department}
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
                              name="profile"
                              label="Szak:"
                              id="profile"
                              defaultValue={formData.profile}
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
                              name="year"
                              label="Évfolyam:"
                              type="number"
                              InputProps={{ inputProps: { min: 1, max: 4 } }}
                              id="year"
                              defaultValue={formData.year}
                              onChange={(e) => {
                                if (e.target.value > 0 && e.target.value < 5) {
                                  setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value,
                                  });
                                }
                              }}
                            />
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Jog
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="role"
                                defaultValue={2}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                              >
                                <MenuItem value={2}>Diák</MenuItem>
                                <MenuItem value={3}>Zsűri</MenuItem>
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

                      {/* Update Teacher  */}

                      <Dialog open={openteacher} onClose={handleClose}>
                        <DialogTitle>Felhasználó Szerkesztése</DialogTitle>
                        <DialogContent>
                          <form
                            sx={{ width: "100%", marginTop: 20 }}
                            onSubmit={handleSubmit}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="name"
                              label="Név"
                              name="name"
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
                              id="email"
                              label="E-mail:"
                              name="email"
                              defaultValue={formData.email}
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
                              id="employment"
                              label="Munkahely:"
                              name="employment"
                              defaultValue={formData.employment}
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
                              id="job_title"
                              label="Beosztás:"
                              name="job_title"
                              defaultValue={formData.job_title}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                          </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Bezárás
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            sx={{
                              color: "white",
                              backgroundColor: "#06d48f",
                              ":hover": { bgcolor: "#06f48f" },
                            }}
                          >
                            Mentés
                          </Button>
                        </DialogActions>
                      </Dialog>

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
    </Box>
  );
}
export default Userlist;

// const SORTERS = {
//   NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
// };

// const getSorter = (data) => {
//   const mapper = (x) => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);
//   console.log(data);
//   // if (data.field === "year") {
//   //   sorter =
//   //     data.direction === "ascending"
//   //       ? SORTERS.NUMBER_ASCENDING(mapper)
//   //       : SORTERS.NUMBER_DESCENDING(mapper);
//   // } else {
//   //   sorter =
//   //     data.direction === "ascending"
//   //       ? SORTERS.STRING_ASCENDING(mapper)
//   //       : SORTERS.STRING_DESCENDING(mapper);
//   // }

//   return sorter;
// };

// let count = userlist.length;
// const service = {
//   fetchItems: (payload) => {
//     let result = Array.from(userlist);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result);
//   },
//   create: (student) => {
//     count += 1;
//     userlist.push({
//       ...student,
//       id: count,
//     });
//     return Promise.resolve(student);
//   },
//   update: (data) => {
//     const student = userlist.find((t) => t.id === data.id);
//     student.name = data.name;
//     student.description = data.description;
//     return Promise.resolve(student);
//   },
//   delete: (data) => {
//     const student = userlist.find((t) => t.id === data.id);
//     userlist = userlist.filter((t) => t.id !== student.id);
//     return Promise.resolve(student);
//   },
// };

// const styles = {
//   container: {
//     marginTop: 100,
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: "fit-content",
//   },
// };

/*<div style={styles.container}>
      <CRUDTable 
        // caption="Felhasználók"
    //     fetchItems={(payload) => service.fetchItems(payload)}
    //   >
    //     <Fields>
    //       <Field name="name" label="Név" placeholder="Name" />
    //       <Field name="email" label="E-mail" />
    //       <Field name="university" label="Egyetem" />
    //       <Field name="department" label="Kar" />
    //       <Field name="profile" label="Szak" />
    //       <Field name="year" label="Évfolyam" />
    //       <Field name="role" label="Jog" />
    //     </Fields>
    //     <CreateForm
    //       name="Student Creation"
    //       message="Create a new student!"
    //       trigger="Create Student"
    //       onSubmit={(student) => service.create(student)}
    //       submitText="Create"
    //       validate={(values) => {
    //         const errors = {};
    //         if (!values.name) {
    //           errors.name = "Please, provide student's name";
            // }

    //         if (!values.description) {
    //           errors.description = "Please, provide student's description";
    //         }

    //         return errors;
    //       }}
    //     />

    //     <UpdateForm
    //       name="Student Update Process"
    //       message="Update student"
    //       trigger="Update"
    //       onSubmit={(student) => service.update(student)}
    //       submitText="Update"
    //       validate={(values) => {
    //         const errors = {};
    //         if (!values.name) {
    //           errors.name = "Please, provide student's name";
    //         }

    //         if (!values.description) {
    //           errors.description = "Please, provide stundent's description";
    //         }

    //         return errors;
    //       }}
    //     />

    //     <DeleteForm
    //       name="Student Delete Process"
    //       message="Are you sure you want to delete student?"
    //       trigger="Delete"
    //       onSubmit={(student) => service.delete(student)}
    //       submitText="Delete"
    //       validate={(values) => {
    //         const errors = {};
    //         if (!values.id) {
    //           errors.id = "Please, provide id";
    //         }
    //         return errors;
    //       }}
    //     />
    //   </CRUDTable>
    // </div>
    */

// <Grid item xs={12} sm={6} md={4}>
//   <form onSubmit={handleSubmit}>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           label="Name"
//           variant="outlined"
//           fullWidth
//           value={formData.name}
//           onChange={(event) =>
//             setFormData({ ...formData, name: event.target.value })
//           }
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           value={formData.email}
//           onChange={(event) =>
//             setFormData({ ...formData, email: event.target.value })
//           }
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Phone"
//           variant="outlined"
//           fullWidth
//           value={formData.phone}
//           onChange={(event) =>
//             setFormData({ ...formData, phone: event.target.value })
//           }
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           startIcon={<editData />}
//         >
//           {editing ? "Update" : "Add"}
//         </Button>
//       </Grid>
//     </Grid>
//   </form>
// </Grid>
