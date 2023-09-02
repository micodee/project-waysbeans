import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";
import { useLoginMutation } from "../store/services/account";

const ModalLogin = (props) => {
  let navigate = useNavigate();

  const {showModal, hideModal, toRegister} = props
  // agar submit tidak merefresh

  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });
  const ChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  
  const [login] = useLoginMutation()
  const SubmitLogin = (e) => {
      e.preventDefault();

      login(formLogin).then(res => {
        if(res?.data?.status === 200){

          setFormLogin({
            email: '',
            password: '',
          });

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })

          // hideModal()
          navigate('/')
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Login Failed',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

  // const SubmitLogin = useMutation(async (e) => {
  //   try {
  //     e.preventDefault();
      
  //     const response = await API.post('/login', formLogin);

  //     // Send data to useContext
  //     dispatch({
  //       type: 'LOGIN_SUCCESS',
  //       payload: response.data.data,
  //     });
  //     setAuthToken(response.data.data.token);
  
  //     setFormLogin({
  //       email: '',
  //       password: '',
  //     });
  //     hideModal()
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Login Success',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })

  //     // Status check
  //     // if (response.data.data.role === 'admin') {
  //     //   navigate('/list-income');
  //     //   window.location.reload();
  //     // } else if (response.data.data.role === 'user') {
  //     //   navigate('/');
  //     //   window.location.reload();
  //     // } else {
  //     //   navigate('/')
  //     // }
  //     navigate('/')
  //   } catch (error) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Login Failed',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   }
  // });


  return (
    <div>
      <Modal show={showModal} onHide={hideModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={SubmitLogin}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" className="formInput" value={formLogin.email} onChange={ChangeLogin} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" name="password" className="formInput" value={formLogin.password} onChange={ChangeLogin} />
            </Form.Group>
            <Button variant="secondary col-12 mb-3" type="submit" style={{ backgroundColor: "#613D2B" }}>
              Login
            </Button>
              <p style={{ color: "red", textAlign: "center" }}>
              </p>
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