import React, { useContext } from "react";
import { Form, Dropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";
import Swal from "sweetalert2";

const UserCust = (props) => {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div>
      <Form className="d-flex align-items-center gap-1">
        <Link to="/cart" className="position-relative">
          <img
            src={`img/nav-cart.png`}
            alt="icon"
            style={{ width: "35px", height: "32px", cursor: "pointer" }}
          />
          <Badge
            pill
            bg="danger"
            style={{ position: "absolute", top: 0, right: "-.5rem" }}
          >
            {props.UserCarts.filter((cart) => cart.user_id === props.User.id)
              .length > 0 && (
              <span>
                {
                  props.UserCarts.filter(
                    (cart) => cart.user_id === props.User.id
                  ).length
                }
              </span>
            )}
          </Badge>
        </Link>
        <Dropdown className="dropdown">
          <Dropdown.Toggle className="profile">
            <img
              src={`img/drop-profile.png`}
              alt="icon"
              style={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile" className="menu">
                <img src={`img/drop-user.png`} alt="user" />
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} className="menu">
              <img src={`img/drop-logout.png`} alt="logout" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default UserCust;
