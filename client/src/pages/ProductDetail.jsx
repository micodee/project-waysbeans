import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import ModalLogin from "../components/ModalLogin";
import ModalRegister from "../components/ModalRegister";
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetProductQuery } from "../store/services/Products";

const ProductDetail = (props) => {
  const [count, setCount] = useState(1)
  const [showLogin, setModalLogin] = useState(false);
  const [showRegister, setModalRegister] = useState(false);

  const { IsLogin, user } = props;
  const navigate = useNavigate();

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const { data: productAPI } = useGetProductQuery();

  const params = useParams();
  let Product = productAPI.filter(
    (Product) => Product.id === parseInt(params.id)
  );
  Product = Product[0];

  const addCart = useMutation(async (e) => {
    try {
      e.preventDefault();
      if (IsLogin != null) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const data = {
          user_id: user.id,
          order_quantity: +1,
        };

        const body = JSON.stringify(data);

        const response = await API.patch(`/cart/${Product.id}`, body, config);
        console.log("transaction success :", response);

        navigate("/cart");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Success",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        setModalLogin(true);
      }
    } catch {
      Swal.fire({
        position: "center",
        icon: "failed",
        title: "Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleLess = () => {
    if (count === 1) {
      return 1
    };
    setCount(count - 1);
  };

  return (
    <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <Col className="header col-4">
          <img src={Product.photo} alt={Product.name} className="detailImg" style={{ borderRadius: '7px' }}/>
        </Col>
        <Col className="header col-7 d-flex justify-content-center align-items-center">
          <div className="col-10">
            <h3 className="mt-2 mb-0 detailName">{Product.name}</h3>
            <p className="mt-0 mb-5 detailStock">Stock : {Product.stock}</p>
            <p className="detaildesc">{Product.description}</p>
            <p className="detailprice">Rp.{Product.price}</p>

            <div className="d-flex gap-5">
              <div className="d-flex align-items-center gap-2">
                <div onClick={handleLess} className="d-flex justify-content-center align-items-center" style={{ background: '#F6E6DA', padding: '1rem .6rem', borderRadius: '7px', cursor: 'pointer' }}>
                  <span className="lessQty" ></span>
                </div>
                <span
                  style={{
                    backgroundColor: "#F6E6DA",
                    padding: ".1rem .75rem",
                    borderRadius: "5px",
                  }}
                >
                  {count}
                </span>
                <div onClick={handleAdd} className="d-flex justify-content-center align-items-center" style={{ background: '#F6E6DA', padding: '1rem .6rem', borderRadius: '7px', cursor: 'pointer' }}>
                  <span className="addQty" ></span>
                </div>
              </div>
            <Button
              onClick={(e) => addCart.mutate(e)}
              className="detailBtnAdd"
              style={{ width: '100%' }}
            >
              Add Cart
            </Button>{" "}
            </div>
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
  );
};

export default ProductDetail;
