import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/AuthSlice";
function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);
  return <div>Logout</div>;
}

export default Logout;
