import React from "react";
import Header from "../components_admin/Header";
import { Box } from "@mui/material";

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: { xs: "95%", md: "95%", lg: "80%" },
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "3%",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default LayoutAdmin;
