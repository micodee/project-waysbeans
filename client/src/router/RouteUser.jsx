import { Outlet, Navigate } from "react-router-dom";

export default function RouteUser(props) {
  return props.IsUser === true ? <Outlet /> : <Navigate to="/" />;
}
