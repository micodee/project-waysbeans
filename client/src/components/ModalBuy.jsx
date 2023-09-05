import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalBuy = (props) => {

  return (
    <div>
      <Modal show={props.showbuy} onHide={props.hideEdit} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#613D2B", fontWeight: "900" }}>
            Payment Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.SubmitPayment}>
            <Form.Group className="mb-3">
              <Form.Control type="text" onChange={props.ChangePayment} placeholder="Name" name="name" className="formInput" value={props.formPayment.name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" onChange={props.ChangePayment} placeholder="Email" name="email" className="formInput" value={props.formPayment.email} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" onChange={props.ChangePayment} placeholder="Phone" name="phone" className="formInput" value={props.formPayment.phone} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" onChange={props.ChangePayment} placeholder="Address" name="address" className="formInput" value={props.formPayment.address} />
            </Form.Group>
            <Form.Text className="custom-text-primary fw-bold d-block my-2 mb-4">
              Qty : {props.qty}
              <br/>
              Total : Rp{props.total}
            </Form.Text>
            <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#613D2B" }}>
              Pay
            </Button>
              <p style={{ color: "red", textAlign: "center" }}>
              </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalBuy;