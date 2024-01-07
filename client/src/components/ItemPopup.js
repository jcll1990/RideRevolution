import React, { useState } from "react";

const ItemPopup = ({ item, onClose, user, setUser, items, setItems, order, filter, setFilter }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value, 10));
  };



  function addToCart(event, item) {
    event.preventDefault();

    const quantity = parseInt(event.target.quantity.value, 10);
    const newStock = item.stock - quantity;

    if (newStock >= 0 && user.id >= 1) {
      fetch(`http://127.0.0.1:5555/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_stock: newStock }),
      })
        .then((response) => {
          fetch("http://127.0.0.1:5555/items")
            .then((r) => r.json())
            .then((data) => setItems(data))
            .catch((error) => {
              console.error("Error fetching updated items:", error);
            });

          console.log("Items updated");

          fetch("http://127.0.0.1:5555/add_to_cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: order,
              item_id: item.id,
              quantity: quantity,
            }),
          })
            .then((cartResponse) => {
              if (cartResponse.ok) {
                console.log("Item added to the cart successfully");
                alert("Added to your cart");
                onClose()
              } else {
                console.log("Failed to add item to the cart");
              }
            })
            .catch((error) => {
              console.error("Error adding the item to the cart:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating stock:", error);
        });
    } else if (newStock < 0) {
      alert("Not enough stock");
    } else {
      alert("You need to log in");
    }

    event.target.reset();
  }
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{item.name}</h2>
        <p>{item.category}</p>

        <img src={item.image} alt="Product Image" />
        <p>{item.brand}</p>
        <p>${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p>{item.description} units</p>
        {item.stock > 0 ? (
          <form onSubmit={(event) => addToCart(event, item)}>
            <label htmlFor="quantity">Quantity:</label>
            <select
              name="quantity"
              id="quantity"
              defaultValue="1"
              max={Math.floor(item.stock / 2)}
            >
              {[...Array(Math.floor(item.stock)).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
  
            <input type="submit" value="Add to the cart" />
          </form>
        ) : (
          <div>
            <h2>Out of Stock</h2>
            <h4>More stock coming soon</h4>
          </div>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
  
};

export default ItemPopup;
