import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
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
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";

function Menulist() {
  // Változók inicializálása
  const [openUpdateDialog, setopenUpdateDialog] = useState(false);
  const [openInsertDialog, setopenInsertDialog] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    page_id: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    page_id: 0,
  });
  const [editId, setEditId] = useState(null);

  // Vége - Változók deklarálása

  // használt függvények deklarálása

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/menuswithpages`
    );
    const responseData = response.data;
    setData(responseData);
  };

  const handleInsertClick = async () => {
    const responsepages = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/pages`
    );
    const responsePagesData = responsepages.data;
    setPages(responsePagesData);
    if (responsePagesData.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        page_id: responsePagesData[0].id,
      }));
    }
    setopenInsertDialog(true);
  };
  const editData = async (id) => {
    const responsepages = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/pages`
    );
    const responsePagesData = responsepages.data;
    setPages(responsePagesData);
    if (responsePagesData.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        page_id: responsePagesData[0].id,
      }));
    }
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/menu/${id}`
    );
    setFormData(response.data);
    setEditId(id);
    setopenUpdateDialog(true);
  };

  const handleInsertSubmit = (event) => {
    event.preventDefault();
    insertData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

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
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newmenu`,
        formData
      );
      handleClose();
      const { msg } = response.data;
      alert(msg);
      fetchData();
    }
  };

  const updateData = async () => {
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
    await setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updatemenu/${editId}`,
        formData
      );
      const { msg } = response.data;
      alert(msg);
      handleClose();
      fetchData();
    }
  };

  const handleArrowUpCommand = async (id) => {
    const dataSend = {
      arrow: 1,
    };
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/menus/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  const handleArrowDownCommand = async (id) => {
    const dataSend = {
      arrow: 0,
    };
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/menus/setorder/${id}`,
      dataSend
    );
    fetchData();
  };

  const deleteData = async (id) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deletemenu/${id}`
    );
    const { msg } = response.data;
    alert(msg);
    fetchData();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      page_id: pages.at(0).id,
    });
    setFormErrors({
      name: "",
    });
    setEditId(null);
    setopenUpdateDialog(false);
    setopenInsertDialog(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant={"body"} component={"h1"} paddingTop={3}>
        Menüpontok
      </Typography>

      <Grid container direction="row">
        <Grid item xs={6} alignContent={"center"}>
          <Typography variant={"body"} component={"h2"}>
            A weboldal menüpontjainak kezelése
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            style={{ textTransform: "none" }}
            onClick={handleInsertClick}
            sx={{
              marginTop: 3,
              marginBottom: 3,
              backgroundColor: "#06d48f",
              ":hover": { bgcolor: "#06f48f" },
            }}
          >
            Új menü hozzáadása
          </Button>
        </Grid>
      </Grid>

      {/* Insert Menu  */}

      <Dialog open={openInsertDialog} onClose={handleClose}>
        <DialogTitle>Menü hozzáadása</DialogTitle>
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
              <InputLabel id="pageSelectLabel">Válasszon egy oldalt</InputLabel>
              <Select
                labelId="pageSelectLabel"
                id="pageSelect"
                name="page_id"
                value={formData.page_id}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} value={page.id}>
                    {page.title}
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

      {/* --- End Insert Menu --- */}

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
              <TableCell>Megnevezés</TableCell>
              <TableCell>Hozzárendelt oldal</TableCell>
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
                <TableCell>{item.page.title}</TableCell>
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
                    <DialogTitle>Menü Szerkesztése</DialogTitle>
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
                        <FormControl fullWidth required margin="normal">
                          <InputLabel id="pageSelectLabel">
                            Válasszon egy oldalt
                          </InputLabel>
                          <Select
                            labelId="pageSelectLabel"
                            id="pageSelect"
                            name="page_id"
                            value={formData.page_id}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          >
                            {pages.map((page, index) => (
                              <MenuItem key={index} value={page.id}>
                                {page.title}
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
                  {item.order_num !== data.at(0).order_num && (
                    <IconButton onClick={() => handleArrowUpCommand(item.id)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                  {item.order_num !== data.at(-1).order_num && (
                    <IconButton onClick={() => handleArrowDownCommand(item.id)}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Menulist;

// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import axios from "axios";

// function Menulist() {
//   // Változók inicializálása
//   const [openUpdateDialog, setopenUpdateDialog] = useState(false);
//   const [openInsertDialog, setopenInsertDialog] = useState(false);
//   const [data, setData] = useState([]);
//   const [pages, setPages] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     page_id: 0,
//   });
//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     page_id: 0,
//   });
//   const [editId, setEditId] = useState(null);

//   // Vége - Változók deklarálása

//   // használt függvények deklarálása

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get("http://localhost:5000/menuswithpages");
//     const responseData = response.data;
//     setData(responseData);
//   };

//   const handleInsertClick = async () => {
//     const responsepages = await axios.get("http://localhost:5000/pages");
//     const responsePagesData = responsepages.data;
//     setPages(responsePagesData);
//     if (responsePagesData.length > 0) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         page_id: responsePagesData[0].id,
//       }));
//     }
//     setopenInsertDialog(true);
//   };
//   const editData = async (id) => {
//     const responsepages = await axios.get("http://localhost:5000/pages");
//     const responsePagesData = responsepages.data;
//     setPages(responsePagesData);
//     if (responsePagesData.length > 0) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         page_id: responsePagesData[0].id,
//       }));
//     }
//     const response = await axios.get(`http://localhost:5000/menu/${id}`);
//     setFormData(response.data);
//     setEditId(id);
//     setopenUpdateDialog(true);
//   };

//   const handleInsertSubmit = (event) => {
//     event.preventDefault();
//     insertData();
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     updateData();
//   };

//   const insertData = async () => {
//     const { name } = formData;
//     let errors = {};

//     // Név mező validálás
//     if (name.trim() === "") {
//       errors.name = "Név mező kötelező !";
//     } else {
//       if (name.trim().length <= 3) {
//         errors.name = "A név legalább 3 karakterből kell álljon !";
//       }
//     }
//     await setFormErrors(errors);
//     if (Object.keys(errors).length === 0) {
//       const response = await axios.post(
//         "http://localhost:5000/newmenu",
//         formData
//       );
//       handleClose();
//       const { msg } = response.data;
//       alert(msg);
//       fetchData();
//     }
//   };

//   const updateData = async () => {
//     const { name } = formData;
//     let errors = {};

//     // Név mező validálás
//     if (name.trim() === "") {
//       errors.name = "Név mező kötelező !";
//     } else {
//       if (name.trim().length <= 3) {
//         errors.name = "A név legalább 3 karakterből kell álljon !";
//       }
//     }
//     await setFormErrors(errors);
//     if (Object.keys(errors).length === 0) {
//       const response = await axios.patch(
//         `http://localhost:5000/updatemenu/${editId}`,
//         formData
//       );
//       const { msg } = response.data;
//       alert(msg);
//       handleClose();
//       fetchData();
//     }
//   };

//   const handleArrowUpCommand = async (id) => {
//     const dataSend = {
//       arrow: 1,
//     };
//     await axios.patch(`http://localhost:5000/menus/setorder/${id}`, dataSend);
//     fetchData();
//   };

//   const handleArrowDownCommand = async (id) => {
//     const dataSend = {
//       arrow: 0,
//     };
//     await axios.patch(`http://localhost:5000/menus/setorder/${id}`, dataSend);
//     fetchData();
//   };

//   const deleteData = async (id) => {
//     const response = await axios.patch(
//       `http://localhost:5000/deletemenu/${id}`
//     );
//     const { msg } = response.data;
//     alert(msg);
//     fetchData();
//   };

//   const handleClose = () => {
//     setFormData({
//       name: "",
//       page_id: pages.at(0).id,
//     });
//     setFormErrors({
//       name: "",
//     });
//     setEditId(null);
//     setopenUpdateDialog(false);
//     setopenInsertDialog(false);
//   };
//   return (
//     <div
//       style={{
//         marginTop: 100,
//         marginLeft: "auto",
//         marginRight: "auto",
//         width: "80%",
//       }}
//     >
//       <h1>Menüpontok</h1>
//       <h3>A weboldal menüpontjainak kezelése</h3>

//       <div
//         style={{
//           position: "absolute",
//           top: "120px",
//           right: "10%",
//         }}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           style={{ textTransform: "none" }}
//           onClick={handleInsertClick}
//           sx={{
//             marginTop: 3,
//             marginBottom: 3,
//             backgroundColor: "#06d48f",
//             ":hover": { bgcolor: "#06f48f" },
//           }}
//         >
//           Új menü hozzáadása
//         </Button>
//       </div>

//       {/* Insert Sponsor  */}

//       <Dialog open={openInsertDialog} onClose={handleClose}>
//         <DialogTitle>Menü hozzáadása</DialogTitle>
//         <form
//           sx={{ width: "100%", marginTop: 20 }}
//           autoComplete="off"
//           onSubmit={handleInsertSubmit}
//         >
//           <DialogContent>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               placeholder="Név"
//               id="name"
//               label="Név"
//               name="name"
//               error={!!formErrors.name}
//               helperText={formErrors.name}
//               defaultValue={formData.name}
//               onChange={(e) => {
//                 setFormData({
//                   ...formData,
//                   [e.target.name]: e.target.value,
//                 });
//               }}
//             />
//             <FormControl fullWidth required margin="normal">
//               <InputLabel id="pageSelectLabel">Válasszon egy oldalt</InputLabel>
//               <Select
//                 labelId="pageSelectLabel"
//                 id="pageSelect"
//                 name="page_id"
//                 value={formData.page_id}
//                 onChange={(e) => {
//                   setFormData({
//                     ...formData,
//                     [e.target.name]: e.target.value,
//                   });
//                 }}
//               >
//                 {pages.map((page, index) => (
//                   <MenuItem key={index} value={page.id}>
//                     {page.title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Bezárás
//             </Button>
//             <Button
//               type="submit"
//               sx={{
//                 color: "white",
//                 backgroundColor: "#06d48f",
//                 ":hover": { bgcolor: "#06f48f" },
//               }}
//             >
//               Mentés
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* --- End Insert Sponsor --- */}

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow
//               sx={{
//                 borderBottom: "2px solid black",
//                 "& th": {
//                   fontSize: "1.25rem",
//                   color: "rgba(96, 96, 96)",
//                 },
//               }}
//             >
//               <TableCell>Megnevezés</TableCell>
//               <TableCell>Hozzárendelt oldal</TableCell>
//               <TableCell align="center">Eszközök</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item, index) => (
//               <TableRow
//                 key={index}
//                 sx={{
//                   ":hover": { bgcolor: "#edfff2" },
//                 }}
//               >
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.page.title}</TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="contained"
//                     startIcon={<ModeEditIcon />}
//                     sx={{
//                       backgroundColor: "#06d48f",
//                       ":hover": { bgcolor: "#06f48f" },
//                     }}
//                     onClick={() => editData(item.id)}
//                   >
//                     Szerkesztés
//                   </Button>

//                   {/*   Update Sponosr  */}

//                   <Dialog open={openUpdateDialog} onClose={handleClose}>
//                     <DialogTitle>Menü Szerkesztése</DialogTitle>
//                     <form
//                       sx={{ width: "100%", marginTop: 20 }}
//                       onSubmit={handleSubmit}
//                     >
//                       <DialogContent>
//                         <TextField
//                           variant="outlined"
//                           margin="normal"
//                           required
//                           fullWidth
//                           placeholder="Név"
//                           id="name"
//                           label="Név"
//                           name="name"
//                           error={!!formErrors.name}
//                           helperText={formErrors.name}
//                           defaultValue={formData.name}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               [e.target.name]: e.target.value,
//                             });
//                           }}
//                         />
//                         <FormControl fullWidth required margin="normal">
//                           <InputLabel id="pageSelectLabel">
//                             Válasszon egy oldalt
//                           </InputLabel>
//                           <Select
//                             labelId="pageSelectLabel"
//                             id="pageSelect"
//                             name="page_id"
//                             value={formData.page_id}
//                             onChange={(e) => {
//                               setFormData({
//                                 ...formData,
//                                 [e.target.name]: e.target.value,
//                               });
//                             }}
//                           >
//                             {pages.map((page, index) => (
//                               <MenuItem key={index} value={page.id}>
//                                 {page.title}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>
//                       </DialogContent>
//                       <DialogActions>
//                         <Button onClick={handleClose} color="primary">
//                           Bezárás
//                         </Button>
//                         <Button
//                           type="submit"
//                           sx={{
//                             color: "white",
//                             backgroundColor: "#06d48f",
//                             ":hover": { bgcolor: "#06f48f" },
//                           }}
//                         >
//                           Mentés
//                         </Button>
//                       </DialogActions>
//                     </form>
//                   </Dialog>

//                   {/* --- End Update Sponsor --- */}

//                   <Button
//                     variant="contained"
//                     color="error"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => deleteData(item.id)}
//                   >
//                     Törlés
//                   </Button>
//                 </TableCell>
//                 <TableCell align="center">
//                   {item.order_num !== data.at(0).order_num && (
//                     <IconButton onClick={() => handleArrowUpCommand(item.id)}>
//                       <ArrowUpwardIcon />
//                     </IconButton>
//                   )}
//                   {item.order_num !== data.at(-1).order_num && (
//                     <IconButton onClick={() => handleArrowDownCommand(item.id)}>
//                       <ArrowDownwardIcon />
//                     </IconButton>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default Menulist;
