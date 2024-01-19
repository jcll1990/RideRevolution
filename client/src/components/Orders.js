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
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }


  return (
    
     <div>
        {user.id >= 1 ? (
          <div>
            <div id="storesep1"></div>
            <div id="LoggedBoxorders">
              <div id="LoggedBoxText">
              Logged in with: {user.email}
              </div>
          
              <button id="LoggedBoxButton" onClick={() => logoff(user.id)}>Log off</button>
        
            </div>
            <div id="storesep1"></div>

            {orders.length > 0 ? (
              <>
              <div id="Ordertext">Your Orders:</div>
              <div id="storesep1"></div>
              <div id="orderscontainer">
                
                
                {orders.map((order) => (
                  <ul id="orderslist" key={order.id} onClick={() => handleOrderClick(order)}>
                    <li>Order ID: {order.id}</li>
                    <li>Date Created: {order.created_date}</li>
                    <li>Number of items: {order.n_items}</li>
                    <li>Order price: $ {order.cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
                  </ul>
                ))}
              </div>
              </>
            ) : (
              <></>
            )}
            <div id="storesep1"></div>
            <div id="SelectedOrder">
              {selOrder && selOrder.cost > 0 ? (
                <div>

                  <div id="Ordertext">Items in the order:</div>
                  <div id="storesep1"></div>
                  <div id="imtesinordercontainer">
                  {itemsInOrder.map((itemID) => {
                    const item = items.find((item) => item.id === itemID);
                    const quantity = getQuantityForItem(itemID);
                    
                    return (
                      <>
                      
                      <div id="itemstoshowOrder" key={itemID}>
                       
                      <br/>
                          <div id="itemdetail">Item Quantity: {quantity}</div>
                          <br/>
                         
                         
                              <img src={item.image} alt="Product Image" id="itemimgord" />
                              <br/>
                              <div id="itemdetail">Item Name: {item.name}</div>
                              <br/>
                              <div id="itemdetail">Item Brand: {item.brand}</div>
                              <br/>
                              <div id="itemdetail">Item Price: ${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                              <br/>
                        
                            
                         
                        
                      </div>
                      <div id="storesep1"></div>
                      </>
                    );
                    
                  })}
                  </div>
                  
                </div>
                
              ) : (
                <></>
              )}
            </div>
            
          </div>
        ) : (
        <div id="emptyCart">
         NOTHING TO SHOW
        </div>
        )}
      </div>
    );
}

export default Order;
