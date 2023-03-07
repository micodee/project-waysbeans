import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ProductAdd = (props) => {
  const { Products, SetProducts } = props

  const navigate = useNavigate();
  
  const [imageUrl, setImageUrl] = useState("/img/product4.png");


  const [formAddProduct, setformAddProduct] = useState({
    id:0,
    title: "",
    stock: "",
    price: "",
    description: "",
    image: "product4.png",
  });
  const addProductOnChange = (e) => {
    setformAddProduct({
      ...formAddProduct,
      [e.target.name]: e.target.value,
    });
  };

  const AddProductOnSubmit = (e) => {
    e.preventDefault();
    const lastProductId = Products[Products.length - 1].id;
    const autoId = lastProductId + 1;
    const newProductWithAutoId = {
      ...formAddProduct,
      id: autoId,
      image: imageUrl,
    };
    const updatedProducts = [...Products];
    updatedProducts.push(newProductWithAutoId);
    SetProducts(updatedProducts);
    
    setformAddProduct((formAddProduct) => ({
      ...formAddProduct,
      name: "",
      stock: "",
      price: "",
      description: "",
      image: "",
    }));

    navigate('/')
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  return (
    <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-6 d-flex justify-content-center align-items-center">
          <div className="col-12">
            <h2 style={{ color: "#613D2B", fontWeight: "900", marginBottom: "1.5rem" }}>Add Product</h2>
            <Form onSubmit={AddProductOnSubmit}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={addProductOnChange} value={formAddProduct.title} placeholder="Name" name="title" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={addProductOnChange} value={formAddProduct.stock} placeholder="Stock" name="stock" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={addProductOnChange} value={formAddProduct.price} placeholder="Price" name="price" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" onChange={addProductOnChange} rows={4} value={formAddProduct.description} placeholder="Description Product" name="description" className="formInputTextarea"/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <Form.Control type="file" onChange={handleImageUpload} name="image" style={{backgroundColor: "#613D2B40", border: "2px solid #613D2B"}} placeholder="Upload"/>
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
