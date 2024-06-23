import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

function DialogComponent({
  isopen,
  title,
  handleClose,
  handleSubmit,
  fields,
  formData,
  handleChange,
  formErrors,
}) {
  return (
    <Dialog open={isopen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form
        sx={{ width: "100%", marginTop: 20 }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <DialogContent>
          {fields.map(
            (field, index) => {
              // több soros szöveg
              switch (field.type) {
                case "multiline":
                  return (
                    <TextField
                      key={index}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      placeholder={field.label}
                      id={field.name}
                      label={field.label}
                      multiline
                      rows={10}
                      name={field.name}
                      error={!!formErrors[field.name]}
                      helperText={formErrors[field.name]}
                      defaultValue={formData[field.name]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  );

                // egyszerű szöveg
                case "text":
                  return (
                    <TextField
                      key={index}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      placeholder={field.label}
                      id={field.name}
                      label={field.label}
                      name={field.name}
                      error={!!formErrors[field.name]}
                      helperText={formErrors[field.name]}
                      defaultValue={formData[field.name]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  );
                // szám
                case "number":
                  return (
                    <TextField
                      key={index}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      placeholder={field.label}
                      id={field.name}
                      label={field.label}
                      type="number"
                      InputProps={{
                        inputProps: {
                          max: field.maxnumber,
                          min: field.minNumber,
                        },
                      }}
                      name={field.name}
                      error={!!formErrors[field.name]}
                      helperText={formErrors[field.name]}
                      defaultValue={formData[field.name]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  );

                // email
                case "email":
                  return (
                    <TextField
                      key={index}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      placeholder={field.label}
                      id={field.name}
                      label={field.label}
                      type="email"
                      name={field.name}
                      error={!!formErrors[field.name]}
                      helperText={formErrors[field.name]}
                      defaultValue={formData[field.name]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  );
                default:
                  return "";
              }
            }

            //   field.type === "multiline" && (
            //     <TextField
            //       key={index}
            //       variant="outlined"
            //       margin="normal"
            //       required
            //       fullWidth
            //       placeholder={field.label}
            //       id={field.name}
            //       label={field.label}
            //       multiline
            //       rows={10}
            //       name={field.name}
            //       error={!!formErrors[field.name]}
            //       helperText={formErrors[field.name]}
            //       defaultValue={formData[field.name]}
            //       onChange={(e) => {
            //         handleChange(e);
            //       }}
            //     />
            //   )
          )}

          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Kívvonat szövege"
            id="abstract"
            label="Kívonat"
            multiline
            rows={10}
            name="abstract"
            //   error={!!formErrors.abstract}
            //   helperText={formErrors.abstract}
            defaultValue={editAbstractFormData.abstract}
            onChange={(e) => {
              setEditAbstractFormData({
                ...editAbstractFormData,
                [e.target.name]: e.target.value,
              });
            }}
          /> */}
          {/* {abstractError ? (
            <Typography color={"red"}>{abstractError}</Typography>
          ) : (
            ""
          )} */}
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
  );
}

export default DialogComponent;
