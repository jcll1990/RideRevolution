import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Order({ user,items }) {
  const [selOrder, setSelOrder] = useState({});
  const [userOrders, setUserOrders]= useState([]);
  const [userOrderID, setUserOrdersID]= useState([]);
  const [orders, setOrders] =useState([])
  const [itemsInOrder, setItemsInOrder] = useState([])
 
  let tempArray = [];


  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user_order?user_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Access the 'orders' property
        const ordersData = data.orders || [];
  
        setUserOrdersID(ordersData.map((order) => order.order_id));
        setUserOrders(ordersData);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);


  
  

  function getorders() {
    const tempOrder = [];
  
    // Create an array of promises for each fetch request
    const fetchPromises = userOrderID.map((i) =>
      fetch(`http://127.0.0.1:5555/order/${i}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the data for each order as needed
          tempOrder.push(data);
        })
        .catch((error) => console.error(`Error fetching order ${i}:`, error))
    );
  
    // Use Promise.all to wait for all fetch requests to complete
    Promise.all(fetchPromises)
      .then(() => {
        // Once all fetch requests are complete, update the state
        setOrders(tempOrder);
      });
  }
  
  
  

  function handleOrderClick(order) {
    setSelOrder(order);
    console.log(order);
    getItemsID(order);
  

  }
  
  
  function getItemsID(order) {
 
    for (let i = 0; i < order.order_item.length; i++) {
      let itemId = order.order_item[i].item_id;
      tempArray.push(itemId);
    }
    setItemsInOrder(tempArray);
    console.log(tempArray)
  }



  function getQuantityForItem(itemID) {
    const orderItem = selOrder.order_item.find((item) => item.item_id === itemID);
    return orderItem ? orderItem.quantity : 0;
  }


  return (
    <div>

      <button id="getorders" onClick={() => getorders()}>
        My orders
      </button>
  
      <div id="OrderList">
        {orders.length > 0 ? (
          orders.map((order) => (
            <ul key={order.id} onClick={() => handleOrderClick(order)}>
              <li>Order ID: {order.id}</li>
              <li>Date Created: {order.created_date}</li>
              <li>Number of items: {order.n_items}</li>
              <li>Order price: {order.cost}</li>
            </ul>
          ))
        ) : (
          <p>Nothing to show yet</p>
        )}
      </div>
  
      <div id="SelectedOrder">
        {selOrder && selOrder.cost > 0 ? (
          <div>
            <h2>Selected order</h2>
            <ul id="mainOrder">
              <li>Order ID: {selOrder.id}</li>
              <li>Date Created: {selOrder.created_date}</li>
              <li>Number of items: {selOrder.n_items}</li>
              <li>Order price: {selOrder.cost}</li>
            </ul>
            <h3>Items in the order:</h3>
            {itemsInOrder.map((itemID) => {
              const item = items.find((item) => item.id === itemID);
              const quantity = getQuantityForItem(itemID);
              return (
                <div key={itemID}>
                  <ul>
                    <li>Item ID: {itemID}</li>
                    <li>Item Quantity: {quantity}</li>
  
                    {item && (
                      <div>
                        <li><img src={item.image_url} alt="Product Image" /></li>
                        <li>Item Name: {item.name}</li>
                        <li>Item Brand: {item.brand}</li>
                        <li>Item Price: {item.price}</li>
                      </div>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nothing to show yet</p>
        )}
      </div>
    </div>
  );
        }  

export default Order;
