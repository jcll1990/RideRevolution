import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Order({ user,items,setUser }) {
  const [selOrder, setSelOrder] = useState({});
  const [orders, setOrders] =useState([])
  const [itemsInOrder, setItemsInOrder] = useState([])
  const history = useHistory();
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


  function logoff(userId) {
    fetch('http://127.0.0.1:5555/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        setUser({});
        alert("Logged off"); 
        history.push("/MotorcycleUpgrades");
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }


  return (
    <div>
    <h1>Logged with: {user.email}</h1>
    <button onClick={() => logoff(user.id)}>Log off</button>


    <div id="OrderList">
      {orders.length > 0 ? (
        <>
          <p>Orders list:</p>
          {orders.map((order) => (
            <ul key={order.id} onClick={() => handleOrderClick(order)}>
              <li>Order ID: {order.id}</li>
              <li>Date Created: {order.created_date}</li>
              <li>Number of items: {order.n_items}</li>
              <li>Order price: $ {order.cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
            </ul>
          ))}
        </>
      ) : (
        <p>No orders yet</p>
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
                        <li><img src={item.image} alt="Product Image" /></li>
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
          <></>
        )}
      </div>
    </div>
  );
        }  

export default Order;
