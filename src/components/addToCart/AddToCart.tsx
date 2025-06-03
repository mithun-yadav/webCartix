import { useMemo, useState } from "react";
import styles from "./addToCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux-toolkit/store";
import { changeQuantity, removeFromCart } from "../../redux-toolkit/cartSlice";
import ConfirmModal from "../confirmModal/confirmModal";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddToCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showModal, setShowModal] = useState(false);
  const [targetItem, setTargetItem] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleQuantityChange = (id: number, delta: number) => {
    dispatch(changeQuantity({ id, delta }));
  };

  const handleRemove = (id: number, title: string) => {
    setTargetItem({ id, title });
    setShowModal(true);
  };

  const confirmRemoval = () => {
    if (targetItem) {
      dispatch(removeFromCart(targetItem.id));
      toast.info(`Removed "${targetItem.title}" from cart.`);
      setShowModal(false);
    }
  };

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCartParent}>
        <div className={styles.emptyCart}>
          <FaCartShopping style={{ color: "#000", fontSize: "3rem" }} />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <div className={styles.emptyCartButton}>
            <button onClick={() => navigate("/")}>Go to Products</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.cartWrapper}>
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id, item.title)}
                    title="Remove item"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      <ConfirmModal
        isOpen={showModal}
        message={`Remove "${targetItem?.title}" from your cart?`}
        onConfirm={confirmRemoval}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default AddToCart;
