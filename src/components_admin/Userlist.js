// import CRUDTable, {
//   Fields,
//   Field,
//   CreateForm,
//   UpdateForm,
//   DeleteForm,
// } from "react-crud-table";
// import "../style/Userlist.css";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

let userlist = [
  {
    id: 1,
    name: "name",
    email: "email2@email.com",
    password: "hashPassword",
    confpassword: "hashPassword",
    university: "university",
    department: "department",
    profile: "profile",
    year: 2,
    role: 2,
    employment: "employment",
    job_title: "job_title",
  },
  {
    id: 2,
    name: "testadmin",
    email: "admin@email.com",
    password: "hashPassword",
    confpassword: "hashPassword",
    university: "university",
    department: "department",
    profile: "profile",
    year: 2,
    role: 1,
    employment: "employment",
    job_title: "job_title",
  },
];

function Userlist() {
  const [data, setData] = useState(userlist);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
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
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setData(response.data);
  };

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchData();
  };
  // () => editData(item.id)
  const editData = async (id) => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setFormData(response.data);
    setEditId(id);
    setEditing(true);
    handleOpen();
  };

  const updateData = async () => {
    await axios.patch(`http://localhost:5000/users/${editId}`, formData);
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
    setEditing(false);
    setEditId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
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
    setEditing(false);
    setEditId(null);
    setOpen(false);
  };

  return (
    <div
      style={{
        marginTop: 100,
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
      }}
    >
      <h2>Felhasználók</h2>
      <h3>Diákok és zsűritagok kezelése</h3>

      <Grid
        flexDirection={"column"}
        // sx={{ width: "80%" }}
      >
        <Grid item xs={12}></Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Név</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Egyetem</TableCell>
                <TableCell>Kar</TableCell>
                <TableCell>Szak</TableCell>
                <TableCell>Évfolyam</TableCell>
                <TableCell>Jog</TableCell>
                <TableCell>Eszközök</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
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

                    <Dialog open={open} onClose={handleClose}>
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
                            id="year"
                            defaultValue={formData.year}
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
                            name="role"
                            label="Jog:"
                            id="role"
                            defaultValue={formData.role}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
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
