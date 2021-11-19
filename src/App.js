import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Signup from "./components/account/Signup";
import Login from "./components/account/Login";
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/:username" component={UserProducts} />
          <Route exact path="/p/create" component={CreateProduct} />
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
