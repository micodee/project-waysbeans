import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalLogin, ModalRegister, UserAdmin, UserCust } from "./Components";

const Header = (props) => {
  const navigate = useNavigate();
  const { IsLogin } = props
  const [showLogin, setModalLogin] = useState(false);
  const [showRegister, setModalRegister] = useState(false);
  return (
    <Navbar className="nav shadow" expand="lg" fixed={"top"}>
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/list-income")}
          style={{ cursor: "pointer" }}
        >
          <img src={`img/nav-logo.png`} alt="icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
          {IsLogin === "admin" ? (
            <>
              <UserAdmin />
            </>
          ) : IsLogin === "user" ? (
            <>
              <UserCust/>
            </>
          ) : (
            <>
              <Form className="d-flex gap-3">
                <Button className="login" onClick={() => setModalLogin(true)}>
                  Login
                </Button>
                <Button
                  className="register"
                  onClick={() => setModalRegister(true)}
                >
                  Register
                </Button>
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Container>

      <ModalLogin
        showModal={showLogin}
        hideModal={() => setModalLogin(false)}
        toRegister={() => [setModalLogin(false), setModalRegister(true)]}
      />

      <ModalRegister
        showModal={showRegister}
        hideModal={() => setModalRegister(false)}
        toLogin={() => [setModalRegister(false), setModalLogin(true)]}
      />
    </Navbar>
  );
};

export default Header;
