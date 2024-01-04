import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Order({ user,items }) {


  const [selOrder, setSelOrder] = useState({});

  const [orders, setOrders] =useState([])
  const [itemsInOrder, setItemsInOrder] = useState([])
 
  let tempArray = [];


  useEffect(() => {
    fetch(`http://127.0.0.1:5555/get_orders?user_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);
  
   
  function handleOrderClick(order) {
    setSelOrder(order);

    getItemsID(order);


  }
  

  function getItemsID(order) {
 
    for (let i = 0; i < order.order_item.length; i++) {
      let itemId = order.order_item[i].item_id;
      tempArray.push(itemId);
    }
    setItemsInOrder(tempArray);

  }



  function getQuantityForItem(itemID) {
    const orderItem = selOrder.order_item.find((item) => item.item_id === itemID);
    return orderItem ? orderItem.quantity : 0;
  }


  return (
    <div>
  
      <div id="OrderList">
        {orders.length > 0 ? (
          orders.map((order) => (
            <ul key={order.id} onClick={() => handleOrderClick(order)}>
              <li>Order ID: {order.id}</li>
              <li>Date Created: {order.created_date}</li>
              <li>Number of items: {order.n_items}</li>
              <li>Order price: $ {order.cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>


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
              <li>Order price: $ {selOrder.cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
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
