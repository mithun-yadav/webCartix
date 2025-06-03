import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-toolkit/cartSlice";
import type { CartItem } from "../../redux-toolkit/cart.interface";
import { toast } from "react-toastify";
import { useState } from "react";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  thumbnail: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  rating,
  description,
  thumbnail,
}) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      title,
      thumbnail,
      price,
      quantity: 1,
    };

    dispatch(addToCart(item));
    toast.success(`${title} added to cart`);
  };
  const [showProductDetailsModal, setProductDetailsShowModal] = useState(false);

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img src={thumbnail} alt={title} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.priceRatingDiv}>
            <div className={styles.price}>${price.toFixed(2)}</div>
            <div className={styles.rating}>⭐ {rating.toFixed(1)}</div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.addToCart}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className={`${styles.button} ${styles.viewDetails}`}
            onClick={() => setProductDetailsShowModal(true)}
          >
            View Details
          </button>
        </div>
      </div>
      {showProductDetailsModal && (
        <ProductDetailsModal
          product={{
            id,
            title,
            thumbnail,
            price,
            quantity: 1,
            description,
            rating,
          }}
          onClose={() => setProductDetailsShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
