import React, { useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Shop from "./components/shop";
import Cart from "./components/cart";
import ItemModal from "./components/itemModal";
import SearchModal from "./components/searchModal";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [shopCategory, setShopCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigate = (page, category = "all") => {
    setCurrentPage(page);
    if (category) {
      setShopCategory(category);
    }
  };

  const handleViewItem = (product) => {
    setActiveModalItem(product);
  };

  const handleAddToCart = (product, quantity = 1, openCartPage = false) => {
    setCartItems((prevItems) => {
      const pId = product.id || product.name;
      const existingIndex = prevItems.findIndex((item) => (item.id || item.name) === pId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + quantity
        };
        return updated;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });

    // Close item popup window
    setActiveModalItem(null);

    // If requested (e.g. Checkout button), open Cart page
    if (openCartPage) {
      setCurrentPage("cart");
    }
  };

  const handleModalCheckout = (product, quantity = 1) => {
    handleAddToCart(product, quantity, true);
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
        onOpenSearch={() => setIsSearchOpen(true)}
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
        <Shop
          category={shopCategory}
          onAddToCart={(product) => handleAddToCart(product, 1, false)}
          onViewItem={handleViewItem}
        />
      ) : currentPage === "contact" ? (
        <ContactUs />
      ) : currentPage === "about" ? (
        <About />
      ) : (
        <Hero onNavigate={handleNavigate} />
      )}

      {/* SEARCH OVERLAY MODAL */}
      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onViewItem={(product) => {
            setIsSearchOpen(false);
            handleViewItem(product);
          }}
        />
      )}

      {/* VIEW ITEM POPUP MODAL */}
      {activeModalItem && (
        <ItemModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onAddToCart={(product, qty) => handleAddToCart(product, qty, false)}
          onCheckout={(product, qty) => handleModalCheckout(product, qty)}
        />
      )}
    </div>
  );
}

export default App;
