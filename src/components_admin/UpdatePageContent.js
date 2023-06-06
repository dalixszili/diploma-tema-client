import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePageContent() {
  // Változók inicializálása

  const navigate = useNavigate();
  const { pageId } = useParams();

  const [formData, setFormData] = useState({});

  const [formErrors, setFormErrors] = useState({
    title: "",
    content: "",
    permalink: "",
    keywords: "",
    description: "",
  });
  // Vége - Változók deklarálása

  const handleEditorChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: content,
    }));
  };
  const handleCancel = async (event) => {
    event.preventDefault();
    setFormData({
      title: "",
      content: "",
      permalink: "",
      keywords: "",
      description: "",
    });
    setFormErrors({
      title: "",
      content: "",
      permalink: "",
      keywords: "",
      description: "",
    });
    navigate("/admin/pages");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content, permalink, keywords, description } = formData;

    let errors = {};

    // Perform form validation
    if (title.trim() === "") {
      errors.title = "Cím mező kötelező !";
    } else {
      if (title.trim().length <= 3) {
        errors.title = "A cím legalább 3 karakterből kell álljon !";
      }
    }

    if (content.trim() === "") {
      errors.content = "Leírás mező kötelező !";
    } else {
      if (content.trim().length <= 10) {
        errors.content = "A leírás legalább 10 karakterből kell álljon !";
      }
    }
    if (permalink.trim() === "") {
      errors.permalink = "Permalink mező kötelező !";
    } else {
      if (permalink.trim().length <= 3) {
        errors.permalink = "A permalink legalább 3 karakterből kell álljon !";
      }
    }

    if (keywords.trim() === "") {
      errors.keywords = "Kulcsszavak mező kötelező !";
    } else {
      if (keywords.trim().length <= 3) {
        errors.keywords = "A kulcsszavak legalább 3 karakterből kell álljon !";
      }
    }

    if (description.trim() === "") {
      errors.description = "Meta leírás mező kötelező !";
    } else {
      if (description.trim().length <= 3) {
        errors.description =
          "A Meta leírás legalább 3 karakterből kell álljon !";
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const response = await axios.patch(
        `http://localhost:5000/updatepage/${pageId}`,

        formData
      );
      const { msg } = response.data;
      alert(msg);
      navigate("/admin/pages");
    } else {
      console.log("BAJ VAN");
    }
  };

  useEffect(() => {
    // fetchData();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/page/${pageId}`
        );
        const responseData = response.data;

        if (isMounted) {
          setFormData(responseData);
        }
      } catch (error) {
        if (isMounted) {
          navigate("/admin/pages");
          alert("Az oldal nem található");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        marginTop: 100,
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
      }}
    >
      <Paper
        style={{}}
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Typography fontWeight={"bold"} variant="h4">
          Új oldal hozzáadása
        </Typography>
        <form
          autoComplete="off"
          sx={{ width: "100%", marginTop: 20 }}
          onSubmit={handleSubmit}
        >
          <TextField
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Cím"
            name="title"
            placeholder="Cím"
            error={!!formErrors.title}
            helperText={formErrors.title}
            value={formData.title || ""}
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
            id="description"
            label="Meta leírás"
            name="description"
            placeholder="Meta leírás"
            error={!!formErrors.description}
            helperText={formErrors.description}
            value={formData.description || ""}
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
            id="keywords"
            label="Meta kulcsszavak"
            name="keywords"
            placeholder="Meta kulcsszavak"
            error={!!formErrors.keywords}
            helperText={formErrors.keywords}
            value={formData.keywords || ""}
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
            id="permalink"
            label="Permalink"
            name="permalink"
            placeholder="Permalink"
            error={!!formErrors.permalink}
            helperText={formErrors.permalink}
            value={formData.permalink || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            style={{ marginBottom: "20px" }}
          />

          {formErrors.content ? (
            <p style={{ color: "red" }}>{formErrors.content}</p>
          ) : (
            <p>
              <b>Leírás</b>
            </p>
          )}

          <SunEditor
            setOptions={{
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "table"],
                ["link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["save", "template"],
              ],
            }}
            onChange={handleEditorChange}
            setContents={formData.content || ""}
          />
          {/* <p style={{ width: "300px" }}>{formData.content}</p> */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={handleCancel}
              variant="contained"
              sx={{
                marginTop: 3,
                marginBottom: 3,
              }}
            >
              Mégsem
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginLeft: 3,
                marginRight: 5,
                marginTop: 3,
                marginBottom: 3,
                backgroundColor: "#06d48f",
                ":hover": { bgcolor: "#06f48f" },
              }}
            >
              Mentés
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default UpdatePageContent;
