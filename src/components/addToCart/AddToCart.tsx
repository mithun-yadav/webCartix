import React, { useState } from "react";
import styles from "./addToCart.module.css";

type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    price: 9.99,
    quantity: 1,
  },
  {
    id: 2,
    title: "Another Beauty Product",
    thumbnail: "https://via.placeholder.com/100",
    price: 14.49,
    quantity: 2,
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartWrapper}>
      {/* Left: Cart Content */}
      <div className={styles.cartContent}>
        <h2 className={styles.cartHeader}>
          Your bag ({cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"})
        </h2>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div className={styles.cartItem} key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className={styles.itemDetails}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </span>
                <div className={styles.quantityControls}>
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.itemSubtotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Summary Box */}
      <div className={styles.cartSummaryWrapper}>
        <div className={styles.cartSummaryTitle}>Total</div>
        <div className={styles.cartSummaryRow}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.cartSummaryRow}>
          <span>Delivery</span>
          <span>Free</span>
        </div>
        <div className={styles.totalAmount}>
          <span>Total (VAT included)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>GO TO CHECKOUT</button>
        <div className={styles.voucherField}>Add a voucher (Optional)</div>
      </div>
    </div>
  );
};

export default CartPage;
