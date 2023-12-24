import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ user, setUser, items, setItems, order }) {

  function addToCart(event, item) {
    event.preventDefault();
  
    const quantity = parseInt(event.target.quantity.value, 10);
    const newStock = item.stock - quantity;
  
    if (newStock >= 0 && user.id >= 1) {
      // Update the stock on the server
      fetch(`http://127.0.0.1:5555/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_stock: newStock }),
      })
        .then((response) => {
          // Fetch the updated items from the server
          fetch("http://127.0.0.1:5555/items")
            .then((r) => r.json())
            .then((data) => setItems(data))
            .catch((error) => {
              console.error("Error fetching updated items:", error);
            });
  
          console.log("Items updated");
  
          // Add the item to the cart
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
    <div>
      <h2>Items list!</h2>
      <div id="itemList">
        {items.map((item, index) => (
          <ul key={index}>
            <li><img src={item.image_url} alt="Product Image" /></li>
            <li>{item.name}</li>
            <li>Brand: {item.brand}</li>
            <li>Category: {item.category}</li>
            <li>Price: ${item.price}</li>
            <li>Stock: {item.stock} units</li>
            {item.stock > 0 ? (
              <form onSubmit={(event) => addToCart(event, item)}>
                <label htmlFor="quantity">Quantity:</label>
                <select name="quantity" id="quantity" defaultValue="1" max={Math.floor(item.stock / 2)}>
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
          </ul>
        ))}
      </div>
    </div>
  );
  
                }
export default Home;