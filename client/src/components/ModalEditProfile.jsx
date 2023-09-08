import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'

import { useSelector } from "react-redux";
import { getAccount } from "../store/reducers/loginSlice";
import { useEditProfileMutation } from "../store/services/account";

const ModalEditProfile = (props) => {
  const user = useSelector(getAccount).user

  const {showEdit, hideEdit} = props
  // agar submit tidak merefresh

  const [editProfile] = useEditProfileMutation()

  const [formEdit, setFormEdit] = useState({
    name: user.fullname,
    email: user.email,
    password: "",
    phone : user.phone || "",
    address : user.address || "",
  });
  const ChangeLogin = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('phone', formEdit.phone);
    formData.append('address', formEdit.address);

    try {
      await editProfile(formData)
  
      hideEdit()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Edit Success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Edit Failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };


  return (
    <div>
      <Modal show={showEdit} onHide={hideEdit} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={SubmitEdit}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Full Name" name="name" className="formInput" value={formEdit.name} onChange={ChangeLogin} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" className="formInput" value={formEdit.email} onChange={ChangeLogin} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" name="password" className="formInput" value={formEdit.password} onChange={ChangeLogin} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" name="phone" className="formInput" value={formEdit.phone} onChange={ChangeLogin} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="text" placeholder="Address" name="address" className="formInput" value={formEdit.address} onChange={ChangeLogin} />
            </Form.Group>
            <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#613D2B" }}>
              Save Change
            </Button>
              <p style={{ color: "red", textAlign: "center" }}>
              </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEditProfile;