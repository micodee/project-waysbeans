import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "../config/api";

const ProductDetail = (props) => {
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
    if (IsLogin) {
      navigate('/')
    } else {
      alert("harus login")
    }
  }

  return (
   <Container className="detail col-9">
   <Row className="d-flex justify-content-between">
     <Col className="header col-4">
       <img src={`http://localhost:5001/uploads/${Product.photo}`} alt={Product.name} style={{ width: "100%", height: "520px", objectFit: "cover" }}/>
     </Col>
     <Col className="header col-7 d-flex justify-content-center align-items-center">
       <div className="col-10">
         <h3 className="mt-2 mb-0" style={{ fontWeight: "900", fontSize: "48px", color: "#613D2B" }}>{Product.name}</h3>
         <p className="mt-0 mb-5" style={{ color: "#974A4A" }}>
           Stock : {Product.stock}
         </p>
         <p style={{ textAlign: "justify" }}>
         {Product.description}
         </p>
         <p style={{ textAlign: "right", fontWeight: "900", fontSize: "24px", color: "#974A4A", marginBottom: "3rem", marginTop: "2rem" }}>Rp.{Product.price}</p>
         <Button onClick={addCart} className="col-12" style={{ backgroundColor: "#613D2B", color: "#fff", border: "none" }}>Add Cart</Button>{' '}
       </div>
     </Col>
   </Row>
   </Container>
  )
}

export default ProductDetail