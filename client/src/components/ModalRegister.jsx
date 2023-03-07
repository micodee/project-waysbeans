import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalRegister = (props) => {
  const { toLogin, showModal, hideModal, Users, SetUsers } = props

  const [formRegister, setFormRegister] = useState({
    id:0,
    isAdmin: false,
    name: "",
    email: "",
    password: "",
    cart: [],
  });
  const registerOnChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const registerOnSubmit = (e) => {
    e.preventDefault();
    const lastUserId = Users[Users.length - 1].id;
    const autoId = lastUserId + 1;
    const newUserWithAutoId = {
      ...formRegister,
      id: autoId,
    };
    const updatedUsers = [...Users];
    updatedUsers.push(newUserWithAutoId);
    SetUsers(updatedUsers);

    setFormRegister((formRegister) => ({
      ...formRegister,
      name: "",
      email: "",
      password: "",
    }));
    toLogin()
  };

  return (
    <div>
      <Modal show={showModal} onHide={hideModal} centered size="sm" className="modalRegister">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => registerOnSubmit(e)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control type="email" placeholder="Email" className="formInput" name="email" required value={formRegister.email} onChange={(e) => registerOnChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control type="password" placeholder="Password" className="formInput" name="password" required value={formRegister.password} onChange={(e) => registerOnChange(e)} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="fullName">
              <Form.Control type="text" placeholder="Full Name" className="formInput" name="name" required value={formRegister.name} onChange={(e) => registerOnChange(e)} />
            </Form.Group>
            <Button type="submit" variant="secondary col-12 mb-3" className="btnModal">
              Register
            </Button>
            <p style={{ textAlign: "center", fontSize: ".9rem" }}>
              Already have an account ?{" "}
              <span onClick={toLogin} style={{ cursor: "pointer" }}>
                Klik <b>Here</b>
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalRegister;
