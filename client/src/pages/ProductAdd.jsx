import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API } from "../config/api";


const ProductAdd = () => {

  const navigate = useNavigate();
  
  const [imageUrl, setImageUrl] = useState("/img/product4.png");


  const [formAddProduct, setformAddProduct] = useState({
    id:0,
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: "product4.png",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setformAddProduct({
      ...formAddProduct,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const submitAddProduct = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('photo', formAddProduct.photo[0], formAddProduct.photo[0].name);
      formData.set('name', formAddProduct.name);
      formData.set('desc', formAddProduct.desc);
      formData.set('price', formAddProduct.price);
      formData.set('stock', formAddProduct.stock);

      // Insert product data
      const response = await API.post('/product', formData, config);
      console.log("add product success : ", response);

      navigate('/list-product');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Product Success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Add Product Failed',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("add product failed : ", error);
    }
  });

  return (
    <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-6 d-flex justify-content-center align-items-center">
          <div className="col-12">
            <h2 style={{ color: "#613D2B", fontWeight: "900", marginBottom: "1.5rem" }}>Add Product</h2>
            <Form onSubmit={(e) => submitAddProduct.mutate(e)}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={handleChange} value={formAddProduct.name} placeholder="Name" name="name" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={handleChange} value={formAddProduct.stock} placeholder="Stock" name="stock" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={handleChange} value={formAddProduct.price} placeholder="Price" name="price" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" onChange={handleChange} rows={4} value={formAddProduct.desc} placeholder="Description Product" name="desc" className="formInputTextarea"/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <Form.Control type="file" onChange={handleChange} name="photo" style={{backgroundColor: "#613D2B40", border: "2px solid #613D2B"}} placeholder="Upload"/>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-6" type="submit" style={{ backgroundColor: "#613D2B" }}>
                  Add Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col className="header col-4 d-flex justify-content-end">
          <img src={imageUrl} alt="product" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAdd;
