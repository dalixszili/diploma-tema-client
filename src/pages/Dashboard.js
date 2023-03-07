import React, { useEffect } from "react";
import Header from "../components_admin/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/AuthSlice";

function Dashboard() {
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
      <Header />;
    </div>
  );
}

export default Dashboard;
