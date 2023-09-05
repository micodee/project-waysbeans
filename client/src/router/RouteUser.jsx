import { Outlet, Navigate } from "react-router-dom";

export default function RouteUser(props) {
  return props.IsUser === "user" ? <Outlet /> : <Navigate to="/" />;
}
