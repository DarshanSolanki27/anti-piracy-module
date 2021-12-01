import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Signup from "./components/account/Signup";
import Com_Signup from "./components/account_company/Com_Signup";
import Login from "./components/account/Login";
import Com_Login from "./components/account_company/Com_Login";
import ConfirmAccountDelete from "./components/account/ConfirmAccountDelete";
import PasswordChange from "./components/account/PasswordChange";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import UserProducts from "./components/product/UserProducts";
import ProductDetailed from "./components/product/ProductDetailed";
import CreateProduct from "./components/product/CreateProduct";
import EditDeleteProduct from "./components/product/EditDeleteProduct";

// Context
import AuthProvider from "./contexts/AuthContext";
import CustomerNavBar from "./components/customer/CustomerNavBar";
import CustomerPurchases from "./components/customer/CustomerPurchses";

function App() {
  const userData = JSON.parse(localStorage.getItem("torch_user_data"));

  return (
    <AuthProvider>
      <BrowserRouter>
        {userData === null || userData["customer"] !== true ? (
          <NavBar />
        ) : (
          <CustomerNavBar />
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/com_login" component={Com_Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/com_signup" component={Com_Signup} />
          <Route exact path="/add-product" component={CreateProduct} />
          <Route exact path="/:id/products" component={UserProducts} />
          <Route exact path="/:id/purchases" component={CustomerPurchases} />
          <Route
            exact
            path="/:username/confirm-delete"
            component={ConfirmAccountDelete}
          />
          <Route exact path="/p/:slug" component={ProductDetailed} />
          <Route exact path="/p/:slug/edit" component={EditDeleteProduct} />
          <Route
            exact
            path="/:username/change-password"
            component={PasswordChange}
          />
          <Route path="*">{<h1>404 Not found</h1>}</Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
