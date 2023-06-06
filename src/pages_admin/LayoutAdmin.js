import React from "react";
import Header from "../components_admin/Header";

const LayoutAdmin = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div>{children}</div>
    </React.Fragment>
  );
};

export default LayoutAdmin;
