import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "../components/Components";
import { Cart, Home, ListIncome, ListProduct, ProductAdd, ProductDetail, ProductUpdate, Transaction } from "../pages/Pages";
import dataProducts from "../assets/json/products.json"
import dataTransaction from "../assets/json/transaction.json"
import dataUsers from "../assets/json/users.json"
import RouteAdmin from "./RouteAdmin";
import RouteUser from "./RouteUser";
//

const MainApp = () => {
  //state global product
  const [Products, SetProducts] = useState(dataProducts);
  const [Transactions, SetTransactions] = useState(dataTransaction)
  const [Users, SetUsers] = useState(dataUsers)

  //tampung for chart
  const [cart, setCart] = useState(0)

  const [formUpdateProduct, setformUpdateProduct] = useState({
    id:0,
    title: "",
    stock: "",
    price: "",
    description: "",
    image: "/img/product4.png",
  });
  
  //state global users
  const [IsUser, setIsUser] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Router>
        <Header IsUser={IsUser} setIsUser={setIsUser} IsAdmin={IsAdmin} setIsAdmin={setIsAdmin} cart={cart} Users={Users} SetUsers={SetUsers} />
        <Routes>
          <Route path="/"  element={<Home Products={Products} />} />
          <Route path="/detail/:id" element={<ProductDetail Products={Products} IsUser={IsUser} />} />

          <Route path="/" element={<RouteUser IsUser={IsUser}/>}>
            <Route path="/cart" element={<Cart Products={Products} SetProducts={SetProducts} Transactions={Transactions} SetTransactions={SetTransactions} cart={cart} setCart={setCart} />} />
            <Route path="/profile" element={<Transaction Transactions={Transactions} />} />
          </Route>

          <Route path="/" element={<RouteAdmin IsAdmin={IsAdmin}/>}>
            <Route path="/add" element={<ProductAdd Products={Products} SetProducts={SetProducts} />} />
            <Route path="/product-update/:id" element={<ProductUpdate Products={Products} SetProducts={SetProducts} formUpdateProduct={formUpdateProduct} setformUpdateProduct={setformUpdateProduct} />} />
            <Route path="/list-product" element={<ListProduct Products={Products} SetProducts={SetProducts} formUpdateProduct={formUpdateProduct} setformUpdateProduct={setformUpdateProduct}/>} />
            <Route path="/list-income" element={<ListIncome />} />
          </Route>

        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default MainApp;
