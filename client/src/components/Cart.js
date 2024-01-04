import { useState, useEffect } from "react";

function Cart({ user, items, cart, setCart, setOrder, order }) {
  const [quantityToRemove, setQuantityToRemove] = useState(1);

  useEffect(() => {
    console.log(order);
    fetch(`http://127.0.0.1:5555/cart?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart_items);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);


  function createOrder(cart, user) {
    if (cart && user.id >= 1) {
      console.log(cart);

      fetch(`http://127.0.0.1:5555/order?order=${order}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      })
        .then((response) => {
          if (response.ok) {
            clear();
            getOrder(user.id)
            return response.json();
          } else {
            throw new Error("Failed to create the order");
          }
        })
        .then((data) => {
          console.log("Order created successfully:", data.order);
        })
        .catch((error) => {
          console.log("Qué pasó");
          console.error("Error creating the order:", error);
        });
    }
  }

  function getOrder(a) {
    console.log(a)
    fetch(`http://127.0.0.1:5555/getorder?user_id=${a}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const orderNumber = data.order_id;
        setOrder(orderNumber);
        console.log("Order Number:", orderNumber);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        console.log("ERROR: Unable to fetch order data");
      });
  }

  function clear() {
    setCart([]);
    
    alert("Order created");
  }



  const removeFromCart = async (event, cartItem, order) => {
    event.preventDefault();

    fetch(`http://127.0.0.1:5555/remove_from_cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            order_id: order,
            item_id: cartItem.item_id,
            quantity: quantityToRemove,
        }),
    })
    .then((response) => response.json())
    .then(() => {
        fetch(`http://127.0.0.1:5555/cart?order=${order}`)
            .then((response) => response.json())
            .then((data) => {
                setCart(data.cart_items);

            })
            .catch((error) => console.error("Error fetching cart items:", error));
    });
  };




  const handleQuantityChange = (event) => {
    setQuantityToRemove(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <button id="createOrderbutton" onClick={() => createOrder(cart, user)}>
        Create order
      </button>
      
      <div id="itemCartList" className="item-grid">
        {cart && cart.length >= 1 ? (
          <>
            <h2>Items in the cart list</h2>
            {cart.map((cartItem, index) => (
              <div key={index} className="cart-item">
                <img src={cartItem.item.image_url} alt="Product Image" />
                <div className="item-details">
                  <h3>{cartItem.item.name}</h3>
                  <p>{cartItem.item.brand}</p>
                  <p>Price: ${cartItem.item.price}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                  <form onSubmit={(event) => removeFromCart(event, cartItem, order)}>
                    <label htmlFor="quantityToRemove">Remove Quantity:</label>
                    <select
                      id="quantityToRemove"
                      name="quantityToRemove"
                      value={quantityToRemove}
                      onChange={handleQuantityChange}
                    >
                      {Array.from({ length: cartItem.quantity }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                    <button type="submit">Remove from Cart</button>
                  </form>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
           <h2>Your carts is empty!</h2>
           </>
        )}
      </div>

    </div>
  );
}

export default Cart;
