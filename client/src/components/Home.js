import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ user, setUser, items, setItems }) {
  function addToCart(event, item) {
    event.preventDefault();

    const quantity = parseInt(event.target.quantity.value, 10);
    const newStock = item.stock - quantity;

    console.log(item.stock);
    console.log(quantity);
    console.log(newStock);

    if (newStock >= 0 && user.id >= 1) {
      fetch(`http://127.0.0.1:5555/items/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_stock: newStock }),
      })
        .then((response) => {
          if (response.ok) {
            // Update the local state with the new stock value
            const updatedItems = items.map((i) => {
              if (i.id === item.id) {
                return { ...i, stock: newStock };
              }
              return i;
            });
            setItems(updatedItems);

            // Add the item to the cart
            fetch("http://127.0.0.1:5555/add_to_cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user.id,
                item_id: item.id,
                quantity: quantity,
              }),
            })
              .then((cartResponse) => {
                if (cartResponse.ok) {
                  console.log("Item added to the cart successfully");
                } else {
                  console.error("Failed to add item to the cart");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            // Handle errors
            console.error("Failed to update stock");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
      <h2>Items list</h2>
      <div id="itemList">
        {items.map((item, index) => (
          <ul key={index}>
            <li><img src={item.image_url} alt="Product Image" /></li>
            <li>{item.name}</li>
            <li>Brand: {item.brand}</li>
            <li>Category: {item.category}</li>
            <li>Price: ${item.price}</li>
            <li>Stock: {item.stock} units</li>
  
            <form onSubmit={(event) => addToCart(event, item)}>
              <label htmlFor="quantity">Quantity:</label>
              <select name="quantity" id="quantity" defaultValue="1" max={Math.floor(item.stock / 2)}>
                {[...Array(Math.floor(item.stock / 2)).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <input type="submit" value="Add to the cart" />
            </form>
          </ul>
        ))}
      </div>
    </div>
  );
  
                }
export default Home;