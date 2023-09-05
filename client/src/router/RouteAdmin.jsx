import { Outlet, Navigate } from "react-router-dom";

export default function RouteAdmin(props) {
  return props.IsAdmin === "admin" ? <Outlet /> : <Navigate to="/" />;
}
