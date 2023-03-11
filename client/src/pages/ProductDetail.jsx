import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "../config/api";
import ModalLogin from "../components/ModalLogin";
import { useState } from "react";
import ModalRegister from "../components/ModalRegister";
import Swal from "sweetalert2";

const ProductDetail = (props) => {
  const [showLogin, setModalLogin] = useState(false);
  const [showRegister, setModalRegister] = useState(false)

  const { IsLogin } = props
  const navigate = useNavigate()
  
      // Fetching product data from database
      let { data: products } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
      });

  const params = useParams();
  let Product = products.filter(Product => Product.id === parseInt(params.id));
  Product = Product[0];

  const addCart = () => {
    if (IsLogin != null) {
      navigate('/cart')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Success',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setModalLogin(true)
    }
  }

  return (
   <Container className="detail col-9">
   <Row className="d-flex justify-content-between">
     <Col className="header col-4">
       <img src={`http://localhost:5001/uploads/${Product.photo}`} alt={Product.name} className="detailImg"/>
     </Col>
     <Col className="header col-7 d-flex justify-content-center align-items-center">
       <div className="col-10">
         <h3 className="mt-2 mb-0 detailName">{Product.name}</h3>
         <p className="mt-0 mb-5 detailStock">
           Stock : {Product.stock}
         </p>
         <p className="detaildesc">
         {Product.description}
         </p>
         <p className="detailprice">Rp.{Product.price}</p>
         <Button onClick={addCart} className="col-12 detailBtnAdd">Add Cart</Button>{' '}
       </div>
     </Col>
   </Row>
   <ModalLogin
        showModal={showLogin}
        hideModal={() => setModalLogin(false)}
        toRegister={() => [setModalLogin(false), setModalRegister(true)]}
      />
      <ModalRegister
        showModal={showRegister}
        hideModal={() => setModalRegister(false)}
        toLogin={() => [setModalRegister(false), setModalLogin(true)]}
      />
   </Container>
  )
}

export default ProductDetail