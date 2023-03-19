import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCart from "../components/ProductCart";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import ModalBuy from "../components/ModalBuy";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  let navigate = useNavigate()
  const [showbuy, setModalBuy] = useState(false);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
  
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

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
      props.SetUserCarts((userCarts) => {
        return userCarts.filter((item) => !(item.user_id === props.user.id && item.id === id));
      });
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

  // sort by id
  let asceding = [];
  if (carts != null) {
    asceding = [...carts];
    asceding.sort((a, b) => b.id - a.id);
  }

  const [formPayment, setPayment] = useState({
    name: props.user.fullname,
    email: props.user.email,
    phone: props.user.profile.phone,
    address: props.user.profile.address,
    total_quantity: asceding?.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentValue) => accumulator + currentValue.order_qty, 0),
    total_price: asceding.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentCart) => accumulator + (currentCart.order_qty * props.Products.find(product => product.id === currentCart.product_id).price), 0),
  });

  const ChangePayment = (e) => {
    setPayment({
      ...formPayment,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitPayment = useMutation(async (e) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const formData = new FormData();
    formData.set('name', formPayment.name);
    formData.set('email', formPayment.email);
    formData.set('phone', formPayment.phone);
    formData.set('address', formPayment.address);

    let formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    const formDataJSON = JSON.stringify(formDataObject);
    try {
      e.preventDefault();
  
      const response = await API.post('/transaction', formDataJSON, config);
      const token = response.data.data.token
  
      window.snap.pay(token, {
        onSuccess: function (result) {
          for (let cart of props.UserCarts.filter(cart => cart.user_id === props.user.id)) {
            const updatedProducts = props.Products.map((product) => {
              if (product.id === cart.product_id) {
                return { ...product, stock: product.stock - cart.order_qty };
              }
              return product;
            });
            props.SetProducts(updatedProducts);
          }
          props.SetUserCarts([]);
          const newTransactionData = {
            id: props.Transactions.length + 1,
            name: formPayment.name,
            email: formPayment.email,
            phone: formPayment.phone,
            address: formPayment.address,
            created_at: new Date(),
            status: "success",
            user: {id:props.user.id},
          }
          props.SetTransactions([...props.Transactions, newTransactionData]);

          setPayment((formPayment) => ({
            ...formPayment,
            name: props.user.name,
            email: props.user.email,
            phone: props.user.profile.phone,
            address: props.user.profile.address,
            total_quantity: asceding?.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentValue) => accumulator + currentValue.order_qty, 0),
            total_price: asceding.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentCart) => accumulator + (currentCart.order_qty * props.Products.find(product => product.id === currentCart.product_id).price), 0),
          }));

         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Payment Success',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/profile')
        },
        onPending: function (result) {
          navigate('/profile')
          return
        },
        onError: function (result) {
          navigate('/profile')
          return
        },
        onClose: function () {
          navigate('/profile')
          return
        },
      });
      setModalBuy(false)
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Payment Failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  });

  const increaseQuantity = async (id) => {
      try {
        await API.patch('/increase-order-quantity/' + id);
      }
      catch (error) {
        return
      }
      const updatedCarts = props.UserCarts.map((cart) => {
        if (cart.user_id === props.user.id) {
          if (cart.id === id) {
            return { ...cart, order_qty: cart.order_qty + 1 };
          }
          return cart;
        }
        return cart;
      });
      props.SetUserCarts(updatedCarts);
  }
  const decreaseQuantity = async (id) => {
    if (props.UserCarts.find(cart => cart.id === id).order_qty > 1) {
      try {
        await API.patch('/decrease-order-quantity/' + id);
      }
      catch (error) {
        return
      }
      const updatedCarts = props.UserCarts.map((cart) => {
        if (cart.user_id === props.user.id) {
          if (cart.id === id) {
            return { ...cart, order_qty: cart.order_qty - 1 };
          }
          return cart;
        }
        return cart;
      });
      props.SetUserCarts(updatedCarts);
    }
  }

  return (
    <>
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
              {asceding
                ?.filter((e) => e.user_id === props.user.id)
                .map((item) => {
                  return (
                    <ProductCart
                      item={item}
                      product={item.product}
                      delete={() => deleteById.mutate(item.id)}
                      increase={() => increaseQuantity(item.id)}
                      decrease={() => decreaseQuantity(item.id)}
                    />
                  );
                })}

              <hr style={{ height: "2px", backgroundColor: "black" }} />
            </div>
          </Col>
          <Col className="header col-4 d-flex justify-content-end">
            {carts?.filter((cart) => cart.user_id === props.user.id).length >
            0 ? (
              <div className="col-12">
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>{props.UserCarts.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentCart) => accumulator + (currentCart.order_qty * props.Products.find(product => product.id === currentCart.product_id).price), 0)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Qty</span>
                  <span>{props.UserCarts?.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentValue) => accumulator + currentValue.order_qty, 0)}</span>
                </div>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <div className="d-flex justify-content-between">
                  <p>
                    <b>Total</b>
                  </p>
                  <p>
                    <b>Rp.{props.UserCarts.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentCart) => accumulator + (currentCart.order_qty * props.Products.find(product => product.id === currentCart.product_id).price), 0)}</b>
                  </p>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    variant="secondary col-6"
                    style={{ backgroundColor: "#613D2B" }}
                    onClick={() => setModalBuy(true)}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
      <ModalBuy 
      showbuy={showbuy} 
      hideEdit={setModalBuy} 
      total={asceding.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentCart) => accumulator + (currentCart.order_qty * props.Products.find(product => product.id === currentCart.product_id).price), 0)}
      qty={asceding?.filter(cart => cart.user_id === props.user.id).reduce((accumulator, currentValue) => accumulator + currentValue.order_qty, 0)}
      formPayment={formPayment} 
      ChangePayment={(e) => ChangePayment(e)}
      SubmitPayment={(e) => SubmitPayment.mutate(e)}
      />
    </>
  );
};

export default Cart;
