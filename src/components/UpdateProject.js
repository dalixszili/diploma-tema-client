import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import DialogComponent from "./DialogComponent";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const titleFields = [{ name: "title", label: "Cím", type: "text" }];
const abstractFields = [
  { name: "abstract", label: "Kívonat", type: "multiline" },
];
const authorFields = [
  { name: "name", label: "Név", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "university", label: "Egyetem", type: "text" },
  { name: "department", label: "Kar", type: "text" },
  { name: "profile", label: "Szak", type: "text" },
  {
    name: "year",
    label: "Évfolyam",
    type: "number",
    minNumber: 1,
    maxnumber: 4,
  },
];

const teacherFields = [
  { name: "name", label: "Név", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "employment", label: "Egyetem", type: "text" },
  { name: "job_title", label: "Beosztás", type: "text" },
];

function UpdateProject({ data, deadlines }) {
  const [settings, setSettings] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [openEditAbstract, setopenEditAbstract] = useState(false);
  const [openEditTitle, setopenEditTitle] = useState(false);
  const [openNewAuthor, setopenNewAuthor] = useState(false);
  const [openEditAuthor, setopenEditAuthor] = useState(false);
  const [openEditTeacher, setopenEditTeacher] = useState(false);
  const [openNewTeacher, setopenNewTeacher] = useState(false);
  const [openAuthorDelete, setopenAuthorDelete] = useState(false);
  const [openTeacherDelete, setopenTeacherDelete] = useState(false);
  const [editAuthorID, setEditAuthorID] = useState(null);
  const [editTeacherID, setEditTeacherID] = useState(null);
  const [deleteAuthorID, setDeleteAuthorID] = useState(null);
  const [deleteTeacherID, setDeleteTeacherID] = useState(null);
  const [editAbstractFormData, setEditAbstractFormData] = useState({
    abstract: "",
  });
  const [editTitleFormData, setEditTitleFormData] = useState({
    title: "",
  });
  const [authorFormData, setAuthorFormData] = useState({
    name: "",
    email: "",
    university: "",
    department: "",
    profile: "",
    year: 0,
  });
  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    email: "",
    employment: "",
    job_title: "",
  });
  const [item, setItem] = useState(data);
  const [abstractError, setAbstractError] = useState({});
  const [titleError, setTitleError] = useState({});
  const [authorError, setAuthorError] = useState({});
  const [teacherError, setTeacherError] = useState({});
  const toScrollRef = useRef(null);

  // console.log(deadlines);
  // Kívonat szerkesztés megnyitás
  const handleOpenEditAbstarct = async () => {
    setEditAbstractFormData({
      ...editAbstractFormData,
      abstract: item.abstract,
    });
    setopenEditAbstract(true);
  };
  // Kívonat szerkesztés bezárás
  const handleCloseAbstract = () => {
    setEditAbstractFormData({ ...editAbstractFormData, abstract: "" });
    setopenEditAbstract(false);
    setAbstractError({});
  };
  // Kívonat szerkesztés közbeni változtatás
  const handleChangeAbstract = (e) => {
    setEditAbstractFormData({
      ...editAbstractFormData,
      [e.target.name]: e.target.value,
    });
  };
  // Kívonat szerkesztés mentés
  const handleSubmitAbstract = async (e) => {
    e.preventDefault();
    let errors = {};

    // mező validálás
    if (editAbstractFormData.abstract.trim() === "") {
      errors.abstract = "A mező kötelező !";
    } else {
      if (editAbstractFormData.abstract.trim().length < 5) {
        errors.abstract = "A kívonat legalább 5 karakterből kell álljon !";
      }
    }
    // ha nincs hiba
    setAbstractError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updateprojectabstract/${data.id}`,
        editAbstractFormData
      );
      handleCloseAbstract();
      actData();
      const { msg } = response.data;
      alert(msg);
    }
  };
  // Cím szerkesztés megnyitás
  const handleCloseTitle = () => {
    setEditTitleFormData({ ...editTitleFormData, title: "" });
    setopenEditTitle(false);
    setTitleError({});
  };
  //  Cím szerkesztés közbeni változtatások
  const handleChangeTitle = (e) => {
    setEditTitleFormData({
      ...editTitleFormData,
      [e.target.name]: e.target.value,
    });
  };
  // Cím szerkesztés mentés
  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    let errors = {};

    if (editTitleFormData.title.trim() === "") {
      errors.title = "A mező kötelező !";
    } else {
      if (editTitleFormData.title.trim().length < 5) {
        errors.title = "A cím legalább 5 karakterből kell álljon !";
      }
    }
    setTitleError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updateprojecttitle/${item.id}`,
        editTitleFormData
      );
      handleCloseTitle();
      actData();
      const { msg } = response.data;
      alert(msg);
    }
  };

  // Cím szerkesztés megnyitás
  const handleOpenEditTitle = async () => {
    setEditTitleFormData({
      ...editTitleFormData,
      title: item.title,
    });
    setopenEditTitle(true);
  };

  // Fájl kiválasztás
  const handleFileOnChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      if (file) alert("A fájl típusa nem PDF !");
      setSelectedFile(null);
    }
  };

  // Új Szerző megnyitása
  const handleOpenNewAuthor = async () => {
    setAuthorFormData({
      ...authorFormData,
      name: "",
      email: "",
      university: "",
      department: "",
      profile: "",
      year: 0,
    });
    setopenNewAuthor(true);
  };

  // Szerző szerkesztés megnyitása
  const handleOpenEditAuthor = async (author) => {
    setAuthorFormData({
      ...authorFormData,
      name: author.name,
      email: author.email,
      university: author.university,
      department: author.department,
      profile: author.profile,
      year: author.year,
    });
    setopenEditAuthor(true);
    setEditAuthorID(author.id);
  };

  // Szerző szerkesztés bezárása
  const handleCloseAuthor = () => {
    setAuthorFormData({
      ...authorFormData,
      name: "",
      email: "",
      university: "",
      department: "",
      profile: "",
      year: 0,
    });
    setopenNewAuthor(false);
    setopenEditAuthor(false);
    setAuthorError({});
  };

  // Szerző szerkesztés közbeni változtatások
  const handleChangeAuthor = (e) => {
    setAuthorFormData({
      ...authorFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Új Szerző mentése
  const handleSubmitNewAuthor = async (e) => {
    e.preventDefault();
    let errors = {};

    // mező validálás
    if (authorFormData.name.trim() === "") {
      errors.name = "A mező kötelező !";
    } else {
      if (authorFormData.name.trim().length < 5) {
        errors.name = "A név legalább 5 karakterből kell álljon !";
      }
    }

    // mező validálás
    if (authorFormData.email.trim() === "") {
      errors.email = "A mező kötelező !";
    } else {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          authorFormData.email.trim()
        )
      ) {
        errors.email = "A megadott e-mail cím nem helyes !";
      }
    }

    // mező validálás
    if (authorFormData.university.trim() === "") {
      errors.university = "A mező kötelező !";
    }

    // mező validálás
    if (authorFormData.department.trim() === "") {
      errors.department = "A mező kötelező !";
    }

    // mező validálás
    if (authorFormData.profile.trim() === "") {
      errors.profile = "A mező kötelező !";
    }

    setAuthorError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newauthor`,
        authorFormData
      );
      if (response.status === 200 && response.data.id) {
        const resp = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/newprojectauthor`,
          {
            project_id: item.id,
            author_id: response.data.id,
          }
        );

        handleCloseAuthor();
        actData();
        const { msg } = resp.data;
        alert(msg);
      } else {
        alert(" Sikertelen mentés ! ");
        handleCloseAuthor();
      }
    }
  };

  // Szerző szerkesztések mentése
  const handleSubmitEditAuthor = async (e) => {
    e.preventDefault();
    let errors = {};

    // mező validálás
    if (authorFormData.name.trim() === "") {
      errors.name = "A mező kötelező !";
    } else {
      if (authorFormData.name.trim().length < 5) {
        errors.name = "A név legalább 5 karakterből kell álljon !";
      }
    }

    // mező validálás
    if (authorFormData.email.trim() === "") {
      errors.email = "A mező kötelező !";
    } else {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          authorFormData.email.trim()
        )
      ) {
        errors.email = "A megadott e-mail cím nem helyes !";
      }
    }

    // mező validálás
    if (authorFormData.university.trim() === "") {
      errors.university = "A mező kötelező !";
    }

    // mező validálás
    if (authorFormData.department.trim() === "") {
      errors.department = "A mező kötelező !";
    }

    // mező validálás
    if (authorFormData.profile.trim() === "") {
      errors.profile = "A mező kötelező !";
    }
    setAuthorError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updateauthor/${editAuthorID}`,
        authorFormData
      );
      if (response.status === 200 && response.data) {
        handleCloseAuthor();
        actData();
        const { msg } = response.data;
        alert(msg);
      } else {
        alert(" Sikertelen mentés ! ");
        handleCloseAuthor();
      }
    }
  };

  // Szerző törlése
  const handleDeleteAuthor = async () => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deleteprojectauthor`,
      {
        project_id: item.id,
        author_id: deleteAuthorID,
      }
    );
    actData();
    setopenAuthorDelete(false);
  };

  // Új tanár megnyitása
  const handleOpenNewTeacher = async () => {
    setTeacherFormData({
      ...teacherFormData,
      name: "",
      email: "",
      employment: "",
      job_title: "",
    });
    setopenNewTeacher(true);
  };

  // Tanár szerkesztés megnyitása
  const handleOpenEditTeacher = async (teacher) => {
    setTeacherFormData({
      ...teacherFormData,
      name: teacher.name,
      email: teacher.email,
      employment: teacher.employment,
      job_title: teacher.job_title,
    });
    setopenEditTeacher(true);
    setEditTeacherID(teacher.id);
  };

  // Tanár szerkesztés bezárása
  const handleCloseTeacher = () => {
    setTeacherFormData({
      ...teacherFormData,
      name: "",
      email: "",
      employment: "",
      job_title: "",
    });
    setopenNewTeacher(false);
    setopenEditTeacher(false);
    setTeacherError({});
  };

  // Tanár szerkesztés közbeni változtatások
  const handleChangeTeacher = (e) => {
    setTeacherFormData({
      ...teacherFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Új Tanár mentése
  const handleSubmitNewTeacher = async (e) => {
    e.preventDefault();
    let errors = {};

    // mező validálás
    if (teacherFormData.name.trim() === "") {
      errors.name = "A mező kötelező !";
    } else {
      if (teacherFormData.name.trim().length < 5) {
        errors.name = "A név legalább 5 karakterből kell álljon !";
      }
    }

    // mező validálás
    if (teacherFormData.email.trim() === "") {
      errors.email = "A mező kötelező !";
    } else {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          teacherFormData.email.trim()
        )
      ) {
        errors.email = "A megadott e-mail cím nem helyes !";
      }
    }

    // mező validálás
    if (teacherFormData.employment.trim() === "") {
      errors.employment = "A mező kötelező !";
    }

    // mező validálás
    if (teacherFormData.job_title.trim() === "") {
      errors.job_title = "A mező kötelező !";
    }

    setTeacherError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/newteacher`,
        teacherFormData
      );
      if (response.status === 200 && response.data.id) {
        const resp = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/newprojectteacher`,
          {
            project_id: item.id,
            teacher_id: response.data.id,
          }
        );

        handleCloseTeacher();
        actData();
        const { msg } = resp.data;
        alert(msg);
      } else {
        alert(" Sikertelen mentés ! ");
        handleCloseTeacher();
      }
    }
  };

  // Tanár szerkesztések mentése
  const handleSubmitEditTeacher = async (e) => {
    e.preventDefault();
    let errors = {};

    // mező validálás
    if (teacherFormData.name.trim() === "") {
      errors.name = "A mező kötelező !";
    } else {
      if (teacherFormData.name.trim().length < 5) {
        errors.name = "A név legalább 5 karakterből kell álljon !";
      }
    }

    // mező validálás
    if (teacherFormData.email.trim() === "") {
      errors.email = "A mező kötelező !";
    } else {
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          teacherFormData.email.trim()
        )
      ) {
        errors.email = "A megadott e-mail cím nem helyes !";
      }
    }

    // mező validálás
    if (teacherFormData.employment.trim() === "") {
      errors.employment = "A mező kötelező !";
    }

    // mező validálás
    if (teacherFormData.job_title.trim() === "") {
      errors.job_title = "A mező kötelező !";
    }

    setTeacherError(errors);
    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/updateteacher/${editTeacherID}`,
        teacherFormData
      );
      if (response.status === 200 && response.data) {
        handleCloseTeacher();
        actData();
        const { msg } = response.data;
        alert(msg);
      } else {
        alert(" Sikertelen mentés ! ");
        handleCloseTeacher();
      }
    }
  };

  // Tanár töltése
  const handleDeleteTeacher = async () => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/deleteprojectteacher`,
      {
        project_id: item.id,
        teacher_id: deleteTeacherID,
      }
    );
    actData();
    setopenTeacherDelete(false);
  };

  // adat lekérés(frissítés)
  const actData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/getprojectbyid/${data.id}`
    );
    const responseData = response.data;
    setItem(() => responseData);
  };

  // Fájl mentés
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("project_file", selectedFile);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/saveprojectfile/${item.id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      actData();
      alert(response.data.msg);
    }
  };

  // Adatok betöltése
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/activesettings`
      );
      const responseData = response.data;
      setSettings(() => responseData);
    };

    fetchData();
    toScrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Általános adatok, határidővel */}
      <Grid
        container
        direction="row"
        borderBottom={3}
        padding={2}
        ref={toScrollRef}
      >
        <Grid item xs={6} component={"h2"}>
          A dolgozat álltalános adatai
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"} color={"red"}>
          <Typography>
            <b> Határidő : </b>
            {settings.project_date
              ? moment(settings.project_date).format("DD.MM.YYYY H:mm")
              : ""}
          </Typography>
        </Grid>
      </Grid>
      {/* Általános adatok törzse  */}
      <Grid container direction="column" alignItems={"center"}>
        {/* Cím szerkesztése */}
        <Grid
          borderBottom={1}
          borderRadius={2}
          marginTop={3}
          width="90%"
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid
            container
            direction="row"
            borderBottom={1}
            padding={2}
            sx={{
              background: "linear-gradient( to top, #edfff2, #ffffff)",
            }}
          >
            <Grid item xs={6} alignContent={"center"}>
              <Typography component={"h3"} fontWeight={"bold"}>
                {" "}
                A dolgozat címe
              </Typography>
            </Grid>
            {Date.parse(deadlines.project_date) >= new Date() ? (
              <Grid item xs={6} textAlign="end" alignContent={"center"}>
                <Button
                  startIcon={<ModeEditOutlinedIcon />}
                  variant="contained"
                  size="small"
                  sx={{
                    // textTransform: "none",
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                  onClick={handleOpenEditTitle}
                >
                  Cím szerkesztése
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <Grid item padding={2}>
            <Typography paddingLeft={2}>
              <b>{item.title}</b>
            </Typography>
          </Grid>
        </Grid>

        {/* Cím Szerkesztés ablak */}
        {Date.parse(deadlines.project_date) >= new Date() ? (
          <DialogComponent
            isopen={openEditTitle}
            title={"Cím szerkesztése"}
            handleClose={handleCloseTitle}
            handleSubmit={handleSubmitTitle}
            fields={titleFields}
            formData={editTitleFormData}
            // setFormData={setEditAbstractFormData}
            formErrors={titleError}
            handleChange={handleChangeTitle}
          />
        ) : (
          ""
        )}

        {/*  Szerzők szerkesztése */}
        <Grid
          borderBottom={1}
          borderRadius={2}
          marginTop={3}
          width="90%"
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid
            container
            direction="row"
            borderBottom={1}
            padding={2}
            sx={{
              background: "linear-gradient( to top, #edfff2, #ffffff)",
            }}
          >
            <Grid item xs={6} alignContent={"center"}>
              <Typography component={"h3"} fontWeight={"bold"}>
                {" "}
                Szerzők{" "}
              </Typography>
            </Grid>
            {Date.parse(deadlines.project_date) >= new Date() ? (
              <Grid item xs={6} textAlign="end" alignContent={"center"}>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  size="small"
                  sx={{
                    // textTransform: "none",
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                  onClick={handleOpenNewAuthor}
                >
                  Új szerző
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          {/* Új szerző ablak*/}
          {Date.parse(deadlines.project_date) >= new Date() ? (
            <DialogComponent
              isopen={openNewAuthor}
              title={"Új szerző"}
              handleClose={handleCloseAuthor}
              handleSubmit={handleSubmitNewAuthor}
              fields={authorFields}
              formData={authorFormData}
              // setFormData={setEditAbstractFormData}
              formErrors={authorError}
              handleChange={handleChangeAuthor}
            />
          ) : (
            ""
          )}

          {/* Szerzők lista  */}
          <Grid item padding={2}>
            {/* <TableContainer component={Paper}> */}
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid black",
                    "& th": {
                      fontSize: "1rem",
                      color: "rgba(96, 96, 96)",
                    },
                  }}
                >
                  <TableCell>Név</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Egyetem</TableCell>
                  <TableCell>Kar</TableCell>
                  <TableCell>Szak</TableCell>
                  <TableCell>Évfolyam</TableCell>
                  {Date.parse(deadlines.project_date) >= new Date() ? (
                    <TableCell align="center">Eszközök</TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {item.authors.map((item, index) => (
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
                    <TableCell>{item.profile} </TableCell>
                    <TableCell>{item.year} </TableCell>

                    {/* >= new Date() */}
                    {/* )} */}
                    {Date.parse(deadlines.project_date) >= new Date() ? (
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
                          onClick={() => handleOpenEditAuthor(item)}
                        >
                          Szerkesztés
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setDeleteAuthorID(() => item.id);
                            setopenAuthorDelete(true);
                          }}
                        >
                          Törlés
                        </Button>
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
          </Grid>
        </Grid>

        {/* Szerző szerkesztés ablak */}
        {Date.parse(deadlines.project_date) >= new Date() ? (
          <DialogComponent
            isopen={openEditAuthor}
            title={"Szerző szerkesztése"}
            handleClose={handleCloseAuthor}
            handleSubmit={handleSubmitEditAuthor}
            fields={authorFields}
            formData={authorFormData}
            // setFormData={setEditAbstractFormData}
            formErrors={authorError}
            handleChange={handleChangeAuthor}
          />
        ) : (
          ""
        )}

        {/* Szerző törlése ablak */}
        {Date.parse(deadlines.project_date) >= new Date() ? (
          <ConfirmDeleteDialog
            open={openAuthorDelete}
            handleClose={() => {
              setopenAuthorDelete(false);
            }}
            handleDelete={handleDeleteAuthor}
          />
        ) : (
          ""
        )}

        {/*  Tanárok szerkesztése */}
        <Grid
          borderBottom={1}
          borderRadius={2}
          marginTop={3}
          width="90%"
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid
            container
            direction="row"
            borderBottom={1}
            padding={2}
            sx={{
              background: "linear-gradient( to top, #edfff2, #ffffff)",
            }}
          >
            <Grid item xs={6} alignContent={"center"}>
              <Typography component={"h3"} fontWeight={"bold"}>
                Vezető tanárok
              </Typography>
            </Grid>
            {Date.parse(deadlines.project_date) >= new Date() ? (
              <Grid item xs={6} textAlign="end" alignContent={"center"}>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  size="small"
                  sx={{
                    // textTransform: "none",
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                  onClick={handleOpenNewTeacher}
                >
                  Új vezető tanár
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          {/* Új tanár ablak*/}
          {Date.parse(deadlines.project_date) >= new Date() ? (
            <DialogComponent
              isopen={openNewTeacher}
              title={"Új tanár"}
              handleClose={handleCloseTeacher}
              handleSubmit={handleSubmitNewTeacher}
              fields={teacherFields}
              formData={teacherFormData}
              // setFormData={setEditAbstractFormData}
              formErrors={teacherError}
              handleChange={handleChangeTeacher}
            />
          ) : (
            ""
          )}

          {/* Tanárok lista  */}
          <Grid item padding={2}>
            {/* <TableContainer component={Paper}> */}
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid black",
                    "& th": {
                      fontSize: "1rem",
                      color: "rgba(96, 96, 96)",
                    },
                  }}
                >
                  <TableCell>Név</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Egyetem</TableCell>
                  <TableCell>Beosztás</TableCell>
                  {Date.parse(deadlines.project_date) >= new Date() ? (
                    <TableCell align="center">Eszközök</TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {item.teachers.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      ":hover": { bgcolor: "#edfff2" },
                    }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.employment}</TableCell>
                    <TableCell>{item.job_title} </TableCell>
                    {Date.parse(deadlines.project_date) >= new Date() ? (
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
                          onClick={() => handleOpenEditTeacher(item)}
                        >
                          Szerkesztés
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setDeleteTeacherID(() => item.id);
                            setopenTeacherDelete(true);
                          }}
                        >
                          Törlés
                        </Button>
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* </TableContainer> */}
          </Grid>
        </Grid>

        {/* Tanárok szerkesztés ablak */}
        {Date.parse(deadlines.project_date) >= new Date() ? (
          <DialogComponent
            isopen={openEditTeacher}
            title={"Tanár szerkesztése"}
            handleClose={handleCloseTeacher}
            handleSubmit={handleSubmitEditTeacher}
            fields={teacherFields}
            formData={teacherFormData}
            // setFormData={setEditAbstractFormData}
            formErrors={teacherError}
            handleChange={handleChangeTeacher}
          />
        ) : (
          ""
        )}
      </Grid>

      {/* Tanár törlése ablak */}
      <ConfirmDeleteDialog
        open={openTeacherDelete}
        handleClose={() => {
          setopenTeacherDelete(false);
        }}
        handleDelete={handleDeleteTeacher}
      />

      {/* Dolgozat kivonata */}
      <Grid
        container
        direction="row"
        borderBottom={3}
        padding={2}
        marginTop={10}
      >
        <Grid item xs={6} component={"h2"}>
          A dolgozat kivonata (sima szöveg formátumban)
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"} color={"red"}>
          <Typography>
            <b> Határidő : </b>
            {settings.abstract_date
              ? moment(settings.abstract_date).format("DD.MM.YYYY H:mm")
              : ""}
          </Typography>
        </Grid>
      </Grid>

      {/* kivonat szerkesztés */}
      <Grid container direction="column" alignItems={"center"}>
        {/* Kivonat szerkesztése törzs */}
        <Grid
          borderBottom={1}
          borderRadius={2}
          marginTop={3}
          width="90%"
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Grid
            container
            direction="row"
            borderBottom={1}
            padding={2}
            sx={{
              background: "linear-gradient( to top, #edfff2, #ffffff)",
            }}
          >
            <Grid item xs={6} alignContent={"center"}>
              <Typography component={"h3"} fontWeight={"bold"}>
                {" "}
                A dolgozat kivonata
              </Typography>
            </Grid>
            {Date.parse(deadlines.abstract_date) >= new Date() ? (
              <Grid item xs={6} textAlign="end" alignContent={"center"}>
                <Button
                  startIcon={<ModeEditOutlinedIcon />}
                  variant="contained"
                  size="small"
                  sx={{
                    // textTransform: "none",
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                  onClick={handleOpenEditAbstarct}
                >
                  Kivonat szerkesztése
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <Grid item padding={2}>
            <Typography
              component={"pre"}
              sx={{ fontFamily: "Times New Roman, serif" }}
            >
              {item.abstract}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Absztrakt Szerkesztés ablak */}
      {Date.parse(deadlines.abstract_date) >= new Date() ? (
        <DialogComponent
          isopen={openEditAbstract}
          title={"Kívonat szerkesztése"}
          handleClose={handleCloseAbstract}
          handleSubmit={handleSubmitAbstract}
          fields={abstractFields}
          formData={editAbstractFormData}
          formErrors={abstractError}
          handleChange={handleChangeAbstract}
        />
      ) : (
        ""
      )}

      {/* Dolgozat feltöltáse */}
      <Grid
        container
        direction="row"
        borderBottom={3}
        padding={2}
        marginTop={10}
      >
        <Grid item xs={6} component={"h2"}>
          A dolgozat feltöltése
        </Grid>
        <Grid item xs={6} textAlign="end" alignContent={"center"} color={"red"}>
          <Typography>
            <b> Határidő : </b>
            {settings.register_project_date
              ? moment(settings.register_project_date).format("DD.MM.YYYY H:mm")
              : ""}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="column" alignItems={"center"}>
        <Grid
          borderBottom={1}
          borderRadius={2}
          marginTop={3}
          padding={2}
          width="90%"
          sx={{
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <form onSubmit={handleSubmitFile}>
            {Date.parse(deadlines.register_project_date) >= new Date() ? (
              <>
                <Grid item paddingLeft={2}>
                  <Typography>
                    A dolgozatot PDF formátumban lehet feltölteni.
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent={"center"} padding={2}>
                  <TextField
                    type={"file"}
                    inputProps={{ accept: "application/pdf" }}
                    onChange={handleFileOnChange}
                  />
                </Grid>
              </>
            ) : (
              ""
            )}

            <Grid item>
              <Typography component="p" variant="inherit" display="inline">
                <b> Feltöltött dolgozat: </b>
              </Typography>
              {item.project_file ? (
                <Typography
                  variant="p"
                  noWrap
                  component={NavLink}
                  target="blank"
                  to={`${process.env.REACT_APP_BACKEND_BASE_URL}/projects/${item.project_file_saved}`}
                  color="GrayText"
                  sx={{ textDecoration: "none" }}
                  underline="none"
                >
                  {item.project_file_saved ? item.project_file : ""}
                </Typography>
              ) : (
                <Typography variant="p" noWrap color="red">
                  [Még nincs feltöltött dolgozat]
                </Typography>
              )}
            </Grid>
            {Date.parse(deadlines.register_project_date) >= new Date() ? (
              <Grid item xs={6} alignContent={"center"} padding={2}>
                <Button
                  variant="contained"
                  type="submit"
                  padding={1}
                  size="small"
                  disabled={selectedFile ? false : true}
                  sx={{
                    backgroundColor: "#06d48f",
                    ":hover": { bgcolor: "#06f48f" },
                  }}
                >
                  Dolgozat feltöltése
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </form>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </>
  );
}

export default UpdateProject;
