import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components/Components";
import { Cart, Home, ListIncome, ListProduct, ProductAdd, ProductDetail, ProductUpdate, Transaction } from "../pages/Pages";
import dataTransaction from "../assets/json/transaction.json"
import RouteAdmin from "./RouteAdmin";
import RouteUser from "./RouteUser";
import { API, setAuthToken } from '../config/api';
import { UserContext } from "../context/contextUser";

const MainApp = () => {
  // layar putih
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  //state global product
  const [Transactions, SetTransactions] = useState(dataTransaction)

  //tampung for chart
  const [cart, setCart] = useState(0)


  return (
    <>
        <Header IsLogin={state.user.role} cart={cart} />
        {isLoading ? null :
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail IsLogin={state.user.role} />} />

          <Route path="/" element={<RouteUser IsUser={state.user.role}/>}>
            <Route path="/cart" element={<Cart Transactions={Transactions} SetTransactions={SetTransactions} cart={cart} setCart={setCart} />} />
            <Route path="/profile" element={<Transaction Transactions={Transactions} user={state.user} />} />
          </Route>

          <Route path="/" element={<RouteAdmin IsAdmin={state.user.role}/>}>
            <Route path="/add" element={<ProductAdd />} />
            <Route path="/product-update/:id" element={<ProductUpdate />} />
            <Route path="/list-product" element={<ListProduct />} />
            <Route path="/list-income" element={<ListIncome />} />
          </Route>
        </Routes>
}
        <Footer />
    </>
  );
};

export default MainApp;
