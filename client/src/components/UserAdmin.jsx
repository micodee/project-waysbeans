import React from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserAdmin = (rest) => {
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
            <Dropdown.Item onClick={rest.logout} className="menu">
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
