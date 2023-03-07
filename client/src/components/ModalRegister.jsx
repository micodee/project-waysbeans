import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API } from "../config/api";

const ModalRegister = (props) => {
  const { toLogin, showModal, hideModal } = props

  const [formRegister, setFormRegister] = useState({
  name: '',
  email: '',
  password: '',
  role: 'user',
  });

  const { name, email, password } = formRegister;

  const ChangeRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      const response = await API.post('/register', formRegister);
  
      console.log("register success : ", response)
  
      setFormRegister({
        name: '',
        email: '',
        password: '',
      });
      toLogin()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Register Failed, email is exist',
        showConfirmButton: false,
        timer: 1500
      })
    }
  });

  return (
    <div>
      <Modal show={showModal} onHide={hideModal} centered size="sm" className="modalRegister">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => SubmitRegister.mutate(e)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control type="email" placeholder="Email" className="formInput" name="email" required value={email} onChange={ChangeRegister} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Control type="password" placeholder="Password" className="formInput" name="password" required value={password} onChange={ChangeRegister} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="fullName">
              <Form.Control type="text" placeholder="Full Name" className="formInput" name="name" required value={name} onChange={ChangeRegister} />
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
