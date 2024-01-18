import { useState, useEffect } from "react";

function Cart({ user, items, cart, setCart, setOrder, order }) {
  const [quantityToRemove, setQuantityToRemove] = useState(1);


  useEffect(() => {
    fetch(`http://127.0.0.1:5555/cart?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart_items);

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


  function calculateTotalAmount(cart) {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0;
    }
  
    const totalAmount = cart.reduce((accumulator, currentItem) => {
      if (currentItem.item && currentItem.item.price && currentItem.quantity) {
        return accumulator + currentItem.item.price * currentItem.quantity;
      }
      return accumulator;
    }, 0);
  
    return totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleQuantityChange = (event) => {
    setQuantityToRemove(parseInt(event.target.value, 10));
  };

  return (
<div>
  <div id="itemCartList" className="item-grid">
    {cart && cart.length >= 1 && user.id >= 1 ? (
      <>
        <div id="storesep1"></div>
        <button id="createOrderbutton" onClick={() => createOrder(cart, user)}>
          Create order
        </button>
        <div id="storesep1"></div>
        <div id="Totalamount">Your total is: ${calculateTotalAmount(cart)}</div>
        <div id="storesep1"></div>
        <div id="cartlist">
          {cart.map((cartItem, index) => (
            <>
            <div key={index} id="itemstoshowcart">
              <div id="itemname">{cartItem.item.name}</div>
              <div id="itemimgcont">
                <img
                  id="itemimgcart"
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                />
              </div>
              <div id="itemdetail">{cartItem.item.brand}</div>
              <div id="itemdetail">{cartItem.item.category}</div>

              <div id="itemdetail">Quantity in your cart: {cartItem.quantity}</div>

              <div id="itemdetail">
                Total: ${(cartItem.item.price * cartItem.quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>

              <form id="removecartform" onSubmit={(event) => removeFromCart(event, cartItem, order)}>
                <label htmlFor="quantityToRemove">Remove from cart:</label>
                <select 
                  id="quantitystore"
                  name="quantity"
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
                <input id="addcartstoreinput" type="submit" value="Remove" />
              </form>
              
            </div>
            <div id="storesep1"></div>
            </>
          ))}
        </div>
        <div id="Totalamount">Your total is: ${calculateTotalAmount(cart)}</div>
        <div id="storesep1"></div>
        <button id="createOrderbutton" onClick={() => createOrder(cart, user)}>
          Create order
        </button>
        <div id="storesep1"></div>
        
      </>
    ) : (
      <div id="emptyCart">
        Your cart is empty!
      </div>
    )}
  </div>
</div>

  );
}

export default Cart;
