import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'


const ModalLogin = (props) => {
  const {showModal, hideModal, toRegister, Users} = props
  // agar submit tidak merefresh
  const [errorMessage, setErrorMessage] = useState("");
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });
  const formLoginOnChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Users.some(user => user.email === formLogin.email)) {
      let User = Users.filter(User => User.email === formLogin.email);
      User = User[0];
      if (User.password === formLogin.password) {
        hideModal();
        props.setIsUser(true)
        props.setIsAdmin(User.isAdmin)
        props.linkToAdmin()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You Are Logged In',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        setErrorMessage("Invalid password")
      }
    } else {
      setErrorMessage("Invalid email")
    }

    setFormLogin((formLogin) => ({
      ...formLogin,
      email: "",
      password: ""
    }));
  }


  return (
    <div>
      <Modal show={showModal} onHide={hideModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" className="formInput" value={formLogin.email} onChange={formLoginOnChange} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" name="password" className="formInput" value={formLogin.password} onChange={formLoginOnChange} />
            </Form.Group>
            <Button variant="secondary col-12 mb-3" type="submit" style={{ backgroundColor: "#613D2B" }}>
              Login
            </Button>
            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}
            <p style={{ textAlign: "center", fontSize: ".9rem" }}>
              Don't have an account ?{" "}
              <span
                onClick={toRegister}
                style={{ cursor: "pointer" }}
              >
                Klik <b>Here</b>
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalLogin;