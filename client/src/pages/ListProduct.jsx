import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListProduct = (props) => {
  const navigate = useNavigate()
  const { Products, SetProducts } = props
  const [List, SetList] = useState(Products)

  function deleteProduct(id) {
    const updateProduct = List.filter(item => item.id !== id)
    SetList(updateProduct)
    SetProducts(updateProduct)
  }

  function updateProduct(id) {
    let Product = Products.filter(Product => Product.id === id);
    Product = Product[0];
    props.setformUpdateProduct(Product);
    navigate(`/product-update/${id}`);
  }
  console.log(updateProduct);

  return (
    <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <Col className="header col-12">
          <h2
            style={{
              color: "#613D2B",
              fontWeight: "900",
              marginBottom: "2rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            List Product
          </h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Image</th>
                <th className="text-center">Name</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Price</th>
                <th className="text-center">Description</th>
                <th className="text-center" width={100}>Action</th>
              </tr>
            </thead>
            <tbody>
              {List.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                    <td style={{ verticalAlign: "middle" }}><img src={item.image} alt={item.title} style={{ width: "100px", height: "130px", objectFit: "cover" }} /></td>
                    <td style={{ verticalAlign: "middle" }}>{item.title}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>{item.stock}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>{item.price}</td>
                    <td style={{ verticalAlign: "middle" }}>{item.description}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="d-flex justify-content-evenly align-items-center gap-2">
                      <Button onClick={() => deleteProduct(item.id)} variant="danger">Delete</Button>
                      <Button onClick={() => updateProduct(item.id)} variant="success">Update</Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListProduct;
