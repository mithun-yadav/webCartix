import React from "react";
import styles from "./ProductDetailsModal.module.css";
import type { CartItem } from "../../redux-toolkit/cart.interface";

interface ProductDetailsModalProps {
  product: CartItem & {
    description: string;
    rating: number;
    category?: string;
    brand?: string;
    stock?: number;
    warrantyInformation?: string;
    shippingInformation?: string;
  };
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalBody}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
          />
          <div className={styles.details}>
            <h2>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.row}>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </div>
            <div className={styles.row}>
              <strong>Rating:</strong> ⭐ {product.rating}
            </div>
            {product.brand && (
              <div className={styles.row}>
                <strong>Brand:</strong> {product.brand}
              </div>
            )}
            {product.category && (
              <div className={styles.row}>
                <strong>Category:</strong> {product.category}
              </div>
            )}
            {product.stock !== undefined && (
              <div className={styles.row}>
                <strong>Stock:</strong> {product.stock}
              </div>
            )}
            {product.warrantyInformation && (
              <div className={styles.row}>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </div>
            )}
            {product.shippingInformation && (
              <div className={styles.row}>
                <strong>Shipping:</strong> {product.shippingInformation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
