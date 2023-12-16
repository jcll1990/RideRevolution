import { useState, useEffect } from "react";

function Cart({ user, items, cart, setCart }) {


  const [quantityToRemove, setQuantityToRemove] = useState(1);

  function createOrder(cart, user) {
    if (cart.length >= 1 && user.id >= 1) {
      console.log(cart)

      fetch('http://127.0.0.1:5555/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      })
      .then(response => {
        if (response.ok) {
          clear()
          return response.json();
        } else {
          throw new Error('Failed to create order');
        }
      })
      .then(data => {
        console.log("Order created successfully:", data.order);
        // Handle the order data as needed
      })
      .catch(error => {
        console.error('Error creating order:', error);
        // Handle the error as needed
      });
    }
  }
  
  function clear() {
    setCart([])
    alert("order created")
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/cart?user_id=${user.id}`)
      .then((response) => response.json())
      .then((data) => setCart(data.cart_items))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const removeFromCart = async (event, cartItem) => {
    event.preventDefault();

    // Remove the quantity from the cart
    const response = await fetch(`http://127.0.0.1:5555/remove_from_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        item_id: cartItem.item_id,
        quantity: quantityToRemove,
      }),
    });

    if (response.ok) {
      // Fetch updated cart items after removing from cart
      const updatedResponse = await fetch(
        `http://127.0.0.1:5555/cart?user_id=${user.id}`
      );
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setCart(updatedData.cart_items);
      } else {
        console.error("Failed to fetch updated cart items");
      }
    } else {
      console.error("Failed to remove from cart");
    }
  };

  const handleQuantityChange = (event) => {
    setQuantityToRemove(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <button id="testbutton" onClick={() => createOrder(cart, user)}>
        Create order
      </button>
      <h2>Items in cart list</h2>
      <div id="itemCartList" className="item-grid">
        {cart.map((cartItem, index) => (
          <div key={index} className="cart-item">
            <img src={cartItem.item.image_url} alt="Product Image" />
            <div className="item-details">
              <h3>{cartItem.item.name}</h3>
              <p>{cartItem.item.brand}</p>
              <p>Price: ${cartItem.item.price}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <form onSubmit={(event) => removeFromCart(event, cartItem)}>
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
      </div>
    </div>
  );
                    }  
export default Cart;