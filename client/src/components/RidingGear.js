import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemPopup from "./ItemPopup.js"; // Adjust the path based on your project structure

function RidingGear({ user, setUser, items, setItems, order, filter, setFilter }) {

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
      <div id="storesep1">
      </div>
      <div id="storemaintext">
      Riding gear
      </div>


      <div id="filtercontainer">
        <div id="storefilterinput">
                <div id="storesep1">
      </div>
        <input id="filterinput"
          type="text"
          placeholder="Find items here..."
          onChange={handleFilterChange}
        />
        </div>
        <div id="storesep1">
      </div>
        <div id="storefilterbuttoncontainer">



          <button id="filterbutton"  onClick={() => handleFilterChangeCAT('Helmets')}>Helmets</button>
          <button id="filterbutton"  onClick={() => handleFilterChangeCAT('Jackets')}>Jackets</button>
          <button  id="filterbutton" onClick={() => handleFilterChangeCAT('Boots')}>Boots</button>
          <button id="filterbutton"  onClick={() => handleFilterChangeCAT('Gloves')}>Gloves</button>

          <button  id="filterbutton" onClick={() => handleFilterChangeCAT('')}>Clear filter</button>
        </div>
      </div>
      <div id="storesep">
      </div>
      <div id="itembox">
          {items
          .filter((item) => item.type === "Motorcycle gear")
          .map((item, index) => (

          <div id="itemstoshow" key={index}>
            <div id="itemname">{item.name}</div>
            <div id="itemimgcont">
              <img id="itemimg"
                src={item.image}
                alt="Product Image"
                onClick={() => handleImageClick(item)}
              />
            </div>
            <div id="itemdetail">{item.brand}</div>
            <div id="itemdetail">{item.category}</div>
            <div id="itemdetail">${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
         
              {item.stock > 0 ? (
                <div id="itemstock">
                  <div id="itemstocktext">Stock: {item.stock} units</div>
                  <form id="addtocartstoreform" onSubmit={(event) => addToCart(event, item)}>
                    
                    <select name="quantity" id="quantitystore" defaultValue="1" max={Math.floor(item.stock / 2)}>
                      {[...Array(Math.floor(item.stock)).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>

                    <input id="addcartstoreinput" type="submit" value="Add to the cart" />
                  </form>
                </div>
                ) : (
                  <div id="outofstock">
                    Out of Stock <br/>
                    More stock coming soon
                  </div>
                )}
          </div>
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
            
            <div id="storesep">
      </div>
    </div>

  );
}

export default RidingGear;
