import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components/Components";
import {
  Cart,
  Home,
  ListIncome,
  ListProduct,
  ProductAdd,
  ProductDetail,
  ProductUpdate,
  Transaction,
} from "../pages/Pages";
import RouteAdmin from "./RouteAdmin";
import RouteUser from "./RouteUser";
import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";
import { useCheckAuthQuery } from "../store/services/account";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, setUserLoginState } from "../store/reducers/loginSlice";

const MainApp = () => {
  const dispatch = useDispatch()
  const getUser = useSelector(getAccount)
  const { data: checkAuth } = useCheckAuthQuery({
    token: localStorage.token
  })
  
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [ProductsList, SetProductsList] = useState([]);
  const [TransactionsList, SetTransactionsList] = useState([]);
  const [UserCarts, SetUserCarts] = useState([]);

  useQuery("productsCache", async () => {
    try {
      const response = await API.get("/products");
      SetProductsList(response.data.data);
    } catch (error) {
      return;
    }
  });

  useQuery("transactionsCache", async () => {
    try {
      const response = await API.get("/transaction");
      SetTransactionsList(response.data.data);
    } catch (error) {
      return;
    }
  });

  useQuery("usercartsCache", async () => {
    try {
      const response = await API.get("/cart");
      SetUserCarts(response.data.data);
    } catch (error) {
      return;
    }
  });

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (getUser.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  const checkUser = async () => {
    
    if(localStorage.token) {
        await checkAuth
        dispatch(setUserLoginState({
          type: 'USER_SUCCESS',
          data: checkAuth.data,
        }));

        setIsLoading(false);

    } else {
      dispatch(setUserLoginState({
        type: 'AUTH_ERROR',
      }));

      setIsLoading(false);
    }
};

  useEffect(() => {
    if (localStorage.token && checkAuth?.data) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [checkAuth]);

  // ** scroll to TOP
  useEffect(() => {
    const handleScroll = () => {
      const scrollTopElement = document.querySelector(".scrollTop");
      if (scrollTopElement) {
        if (window.scrollY > 220) {
          scrollTopElement.classList.add("showTop");
        } else {
          scrollTopElement.classList.remove("showTop");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div
            id="loader-container"
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100vw", height: "100vh" }}
          >
            {
              <>
                <img
                  id="loader"
                  src="/img/icon-logo.webp"
                  alt="WaysBeans"
                  className="position-absolute"
                />
                <img
                  src="/img/icon-logo.webp"
                  alt="WaysBeans"
                  className="position-relative"
                />
              </>
            }
          </div>
        </>
      ) : (
        <>
          <svg
            onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="position-fixed scrollTop"
          >
            <path
              fill={"#613D2B"}
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4l107.1-99.9c3.8-3.5 8.7-5.5 13.8-5.5s10.1 2 13.8 5.5l107.1 99.9c4.5 4.2 7.1 10.1 7.1 16.3c0 12.3-10 22.3-22.3 22.3H304v96c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V256H150.3C138 256 128 246 128 233.7c0-6.2 2.6-12.1 7.1-16.3z"
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <div>
              <Header
                IsLogin={getUser.user.role}
                UserCarts={UserCarts}
                User={getUser.user}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/detail/:id"
                  element={
                    <ProductDetail
                      IsLogin={getUser.user.role}
                      user={getUser.user}
                      UserCarts={UserCarts}
                      SetUserCarts={SetUserCarts}
                    />
                  }
                />

                <Route
                  path="/"
                  element={<RouteUser IsUser={getUser.user.role} />}
                >
                  <Route
                    path="/cart"
                    element={
                      <Cart
                        user={getUser.user}
                        Products={ProductsList}
                        SetProductsList={SetProductsList}
                        UserCarts={UserCarts}
                        SetUserCarts={SetUserCarts}
                        TransactionsList={TransactionsList}
                        SetTransactionsList={SetTransactionsList}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Transaction TransactionsList={TransactionsList} />
                    }
                  />
                </Route>

                <Route
                  path="/"
                  element={<RouteAdmin IsAdmin={getUser.user.role} />}
                >
                  <Route path="/add" element={<ProductAdd />} />
                  <Route
                    path="/product-update/:id"
                    element={<ProductUpdate />}
                  />
                  <Route path="/list-product" element={<ListProduct />} />
                  <Route
                    path="/list-income"
                    element={<ListIncome TransactionsList={TransactionsList} />}
                  />
                </Route>
              </Routes>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainApp;
