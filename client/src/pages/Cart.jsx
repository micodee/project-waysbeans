import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCart from "../components/ProductCart";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

const Cart = (props) => {
  const { cart, setCart } = props;

  const handleQty = (count) => {
    setCart(cart + count);
  };

  const [total, setTotal] = useState(0);
  const handleTotal = (count, price) => {
    setTotal(total + count * price);
  };

  let { data: carts, refetch } = useQuery("cartCache", async () => {
    const response = await API.get("/cart");
    return response.data.data;
  });
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/cart/${id}`);
      console.log(response);
      refetch();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  console.log(deleteById);

  return (
    <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <h2
          style={{
            color: "#613D2B",
            fontWeight: "900",
            marginBottom: "1.5rem",
            padding: "0",
            fontSize: "24px",
          }}
        >
          My Cart
        </h2>
        <p className="m-0 p-0">Review Your Order</p>
        <Col className="header col-7 d-flex justify-content-center">
          <div className="col-12">
            {carts
              ?.filter((e) => e.user_id === props.user.id)
              .map((item) => {
                return (
                  <ProductCart
                    item={item}
                    product={item.product}
                    handleQty={handleQty}
                    handleTotal={handleTotal}
                    delete={() => deleteById.mutate(item.id)}
                  />
                );
              })}

            <hr style={{ height: "2px", backgroundColor: "black" }} />
          </div>
        </Col>
        <Col className="header col-4 d-flex justify-content-end">
          <div className="col-12">
            <hr style={{ height: "2px", backgroundColor: "black" }} />
            <div className="d-flex justify-content-between">
              <p>Subtotal</p>
              <p>{total}</p>
            </div>
            <div className="d-flex justify-content-between">
              <span>Qty</span>
              <span>{cart}</span>
            </div>
            <hr style={{ height: "2px", backgroundColor: "black" }} />
            <div className="d-flex justify-content-between">
              <p>
                <b>Total</b>
              </p>
              <p>
                <b>{total}</b>
              </p>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary col-6"
                style={{ backgroundColor: "#613D2B" }}
              >
                Buy
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
