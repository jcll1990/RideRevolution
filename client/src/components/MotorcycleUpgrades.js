import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemPopup from "./ItemPopup.js"; // Adjust the path based on your project structure

function MotorcycleUpgrades({ user, setUser, items, setItems, order, filter, setFilter }) {

  const [popupItem, setPopupItem] = useState(null);

  const handleImageClick = (item) => {
    setPopupItem(item);
  };

  const closePopup = () => {
    setPopupItem(null);
  };


  useEffect(() => {
    setFilter('');
  }, []);

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleFilterChangeCAT(a) {
    setFilter(a);
  }

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
                closePopup();
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
    <div id="store">
      <div>
        <input
          type="text"
          placeholder="Filter items by name..."
          onChange={handleFilterChange}
        />

        <div>

          <h2>Filter by category</h2>
          <button onClick={() => handleFilterChangeCAT('Motorcycle engines')}>
            Engine upgrades
          </button>
          <button onClick={() => handleFilterChangeCAT('Motorcycle brakes')}>
            Brakes upgrades
          </button>
          <button onClick={() => handleFilterChangeCAT('Motorcycle exhausts')}>
            Exhaust upgrades
          </button>



          <button onClick={() => handleFilterChangeCAT('')}>Clear filter</button>
        </div>
      </div>

      <h3>Items list!</h3>
      <div id="itemList">
          {items
          .filter((item) => item.type === "Motorcycle upgrades")
          .map((item, index) => (
          <ul key={index}>
            <img
              src={item.image}
              alt="Product Image"
              onClick={() => handleImageClick(item)}
            />

            <li>{item.name}</li>
            <li>Brand: {item.brand}</li>
            <li>Category: {item.category}</li>
            <li>Price: ${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
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

      {popupItem && (
        <ItemPopup
          item={popupItem}
          onClose={closePopup}
          user={user}
          setUser={setUser}
          items={items}
          setItems={setItems}
          order={order}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </div>
  );
}

export default MotorcycleUpgrades;
