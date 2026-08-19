import React, { useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Shop from "./components/shop";
import Cart from "./components/cart";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [shopCategory, setShopCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);

  const handleNavigate = (page, category = "all") => {
    setCurrentPage(page);
    if (category) {
      setShopCategory(category);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const pId = product.id || product.name;
      const existingIndex = prevItems.findIndex((item) => (item.id || item.name) === pId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1
        };
        return updated;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    // Open Cart page when an item is added
    setCurrentPage("cart");
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if ((item.id || item.name) === productId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item.id || item.name) !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="App">
      <Navbar
        activePage={currentPage}
        cartCount={cartCount}
        onNavigate={handleNavigate}
      />
      {currentPage === "cart" ? (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onNavigate={handleNavigate}
        />
      ) : currentPage === "shop" ? (
        <Shop category={shopCategory} onAddToCart={handleAddToCart} />
      ) : currentPage === "contact" ? (
        <ContactUs />
      ) : currentPage === "about" ? (
        <About />
      ) : (
        <Hero />
      )}
    </div>
  );
}

export default App;
