import React, { useContext } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";
import Swal from 'sweetalert2'

const UserAdmin = () => {
  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/")
    }
  return (
    <div>
      <Form className="d-flex align-items-center gap-3">
        <Dropdown className="dropdown">
          <Dropdown.Toggle className="profile">
            <img
              src={`img/drop-profile.png`}
              alt="icon"
              style={{
                width: "60px",
                height: "60px",
                cursor: "pointer",
              }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/add" className="menu">
                <img src={`img/drop-beans.png`} alt="user" />
                Add Product
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/list-product" className="menu">
                <img src={`img/drop-beans.png`} alt="user" />
                List Product
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

export default UserAdmin;
