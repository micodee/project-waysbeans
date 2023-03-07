import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const ProductUpdate = (props) => {
  const { Products, SetProducts, formUpdateProduct, setformUpdateProduct } = props

  const navigate = useNavigate();

  const params = useParams();
  let Product = Products.filter(Product => Product.id === parseInt(params.id));
  Product = Product[0];
  const [imageUrl, setImageUrl] = useState(Product.image);


  const updateProductOnChange = (e) => {
    setformUpdateProduct({
      ...formUpdateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const updateProductOnSubmit = (e) => {
    e.preventDefault();
    const newProductWithImage = {
      ...formUpdateProduct,
      image: imageUrl,
    };
    const indexToDelete = Products.findIndex(item => item.id === newProductWithImage.id);
    if (indexToDelete !== -1) {
      Products.splice(indexToDelete, 1);
      Products.splice(indexToDelete, 0, newProductWithImage);
    }
    SetProducts([...Products]);
    
    setformUpdateProduct((formUpdateProduct) => ({
      ...formUpdateProduct,
      name: "",
      stock: "",
      price: "",
      description: "",
      image: "",
    }));

    navigate('/list-product')
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
            <h2 style={{ color: "#613D2B", fontWeight: "900", marginBottom: "1.5rem" }}>Update Product</h2>
            <Form onSubmit={updateProductOnSubmit}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={updateProductOnChange} value={formUpdateProduct.title} placeholder="Name" name="title" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={updateProductOnChange} value={formUpdateProduct.stock} placeholder="Stock" name="stock" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={updateProductOnChange} value={formUpdateProduct.price} placeholder="Price" name="price" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" onChange={updateProductOnChange} rows={4} value={formUpdateProduct.description} placeholder="Description Product" name="description" className="formInputTextarea"/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <Form.Control type="file" onChange={handleImageUpload} name="image" style={{backgroundColor: "#613D2B40", border: "2px solid #613D2B"}} placeholder="Upload"/>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-6" type="submit" style={{ backgroundColor: "#613D2B" }}>
                  Update Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col className="header col-4 d-flex justify-content-end">
          <img src={imageUrl} alt={Product.title} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductUpdate;
