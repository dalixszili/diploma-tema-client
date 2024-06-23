import React, { useEffect } from "react";
import Userlist from "../components_admin/Userlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/AuthSlice";
import LayoutAdmin from "./LayoutAdmin";

function Users() {
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
    <div>
      <LayoutAdmin>
        <Userlist />
      </LayoutAdmin>
    </div>
  );
}

export default Users;
