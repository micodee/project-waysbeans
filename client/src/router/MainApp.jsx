import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components/Components";
import { Cart, Home, ListIncome, ListProduct, ProductAdd, ProductDetail, ProductUpdate, Transaction } from "../pages/Pages";
import dataTransaction from "../assets/json/transaction.json"
import RouteAdmin from "./RouteAdmin";
import RouteUser from "./RouteUser";
import { API, setAuthToken } from '../config/api';
import { UserContext } from "../context/contextUser";
import { useQuery } from "react-query";

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

  const [ProductsList, SetProductsList] = useState([]);
  const [TransactionsList, SetTransactionsList] = useState([]);
  const [UserCarts, SetUserCarts] = useState([]);

    useQuery('productsCache', async () => {
      try {
        const response = await API.get('/products');
        SetProductsList(response.data.data);
      }
      catch (error) {
        return
      }
    });

    useQuery('transactionsCache', async () => {
      try {
        const response = await API.get('/transaction');
        SetTransactionsList(response.data.data);
      }
      catch (error) {
        return
      }
    });

    useQuery('usercartsCache', async () => {
      try {
        const response = await API.get('/cart');
        SetUserCarts(response.data.data);
      }
      catch (error) {
        return
      }
    });



  return (
    <>
        <Header IsLogin={state.user.role} UserCarts={UserCarts} User={state.user} />
        {isLoading ? null :
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/detail/:id" element={<ProductDetail IsLogin={state.user.role} user={state.user} UserCarts={UserCarts} SetUserCarts={SetUserCarts} />} />

          <Route path="/" element={<RouteUser IsUser={state.user.role}/>}>
            <Route path="/cart" element={<Cart user={state.user} Products={ProductsList} SetProductsList={SetProductsList} UserCarts={UserCarts} SetUserCarts={SetUserCarts} TransactionsList={TransactionsList} SetTransactionsList={SetTransactionsList} />} />
            <Route path="/profile" element={<Transaction user={state.user} TransactionsList={TransactionsList} />} />
          </Route>

          <Route path="/" element={<RouteAdmin IsAdmin={state.user.role}/>}>
            <Route path="/add" element={<ProductAdd />} />
            <Route path="/product-update/:id" element={<ProductUpdate />} />
            <Route path="/list-product" element={<ListProduct />} />
            <Route path="/list-income" element={<ListIncome TransactionsList={TransactionsList} />} />
          </Route>
        </Routes>
}
        <Footer />
    </>
  );
};

export default MainApp;
