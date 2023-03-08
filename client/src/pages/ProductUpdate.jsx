import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";


const ProductUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [formUpdateProduct, setForm] = useState({
    photo: '',
    name: '',
    desc: '',
    price: '',
    stock: '',
  }); //Store product data

  async function getDataUpdate() {
    const responseProduct = await API.get('/product/' + id);
    setImageUrl(`http://localhost:5001/uploads/` + responseProduct.data.data.photo);

    setForm({
      ...formUpdateProduct,
      name: responseProduct.data.data.name,
      desc: responseProduct.data.data.description,
      price: responseProduct.data.data.price,
      stock: responseProduct.data.data.stock,
    });
  }

  useEffect(() => {
    getDataUpdate()
  }, []);

   // Handle change data on form
   const handleChange = (e) => {
    setForm({
      ...formUpdateProduct,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
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
      if (formUpdateProduct.photo) {
        formData.set('photo', formUpdateProduct?.photo[0], formUpdateProduct?.photo[0]?.name);
      }
      formData.set('name', formUpdateProduct.name);
      formData.set('desc', formUpdateProduct.desc);
      formData.set('price', formUpdateProduct.price);
      formData.set('stock', formUpdateProduct.stock);

      const response = await API.patch(
        '/product/' + id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/list-product');
    } catch (error) {
      console.log(error);
    }
  });
  

  return (
    <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-6 d-flex justify-content-center align-items-center">
          <div className="col-12">
            <h2 style={{ color: "#613D2B", fontWeight: "900", marginBottom: "1.5rem" }}>Update Product</h2>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={handleChange} value={formUpdateProduct.name} placeholder="Name" name="name" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={handleChange} value={formUpdateProduct.stock} placeholder="Stock" name="stock" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={handleChange} value={formUpdateProduct.price} placeholder="Price" name="price" className="formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" onChange={handleChange} rows={4} value={formUpdateProduct.desc} placeholder="Description Product" name="desc" className="formInputTextarea"/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-6">
                <Form.Control type="file" onChange={handleChange} name="photo" style={{backgroundColor: "#613D2B40", border: "2px solid #613D2B"}} placeholder="Upload"/>
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
          <img src={imageUrl} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductUpdate;
