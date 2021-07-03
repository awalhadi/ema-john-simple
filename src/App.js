import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const userContext = createContext();

function App() {

  const [loggedinUser, setloggedinUser] = useState({})
  return (
    <userContext.Provider value={[loggedinUser, setloggedinUser]}>
      <h1>Email:{loggedinUser.email}</h1>
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/mange-inventory">
            <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
