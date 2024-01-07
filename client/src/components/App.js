import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";
import Home from "./Home.js";
import Login from "./Login.js";
import Cart from "./Cart.js";
import About from "./About.js";
import Orders from "./Orders.js";


//Solo puedo agregar la mitad del stock????
//bloquear todo hasta que se borre el carro?


function App() {

  const [user, setUser] = useState({});

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [itemStock, setItemStock] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(0)
  
  useEffect(() => {
    fetch("/check_session").then((res) => {
        if (res.ok) {
            res.json().then((user) => setCurrentUser(user));
        }
    });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/items")
    .then((r) => r.json())
    .then((data) => setItems(data));
  }, []);

  const filteredItems = items.filter(item => {
    const itemName = item.name.toLowerCase();
    const brand = item.brand.toLowerCase();
    const category = item.category.toLowerCase();
    const type = item.type.toLowerCase();
    const filterValue = filter.toLowerCase();
  
    return (
      itemName.includes(filterValue) ||
      brand.includes(filterValue) ||
      category.includes(filterValue) ||
      type.includes(filterValue)
    );
  });


  return (
    <div>

      <Header />
      <main>

        <Switch>

        <Route exact path="/">
            <Home 
              order={order}
              user ={user}
              setUser ={setUser}
              items={filteredItems}
              setItems={setItems}
              itemStock = {itemStock}
              setItemStock= {setItemStock}
              filter = {filter}
              setFilter= {setFilter}
            />
          </Route>

        <Route exact path="/login">
            <Login
            order = {order}
            setUser={setUser}
            user = {user}
            setOrder = {setOrder}
            />
          </Route>

          <Route exact path="/cart">
            <Cart
              user ={user}
              setUser ={setUser}
              setItemStock ={setItemStock}
              setItems = {setItems}
              cart = {cart}
              setCart = {setCart}
              setOrder = {setOrder}
              order = {order}

             />
          </Route>

          <Route exact path="/orders">
            <Orders
              user={user}
              items={items}


             />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

        </Switch>
      </main>
    </div>
  );
}

export default App;