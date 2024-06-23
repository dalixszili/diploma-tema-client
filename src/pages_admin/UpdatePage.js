import React, { useEffect } from "react";
import LayoutAdmin from "./LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/AuthSlice";
import UpdatePageContent from "../components_admin/UpdatePageContent";

function UpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin/login");
    }
    if (user && user.role !== 1) {
      navigate("/admin/logout");
    }
  }, [isError, user, navigate]);
  return (
    <LayoutAdmin>
      <UpdatePageContent />
    </LayoutAdmin>
  );
}

export default UpdatePage;
