import React from "react";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  title: string;
  price: number;
  rating: number;
  description: string;
  thumbnail: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  rating,
  description,
  thumbnail,
}) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={thumbnail} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>${price.toFixed(2)}</div>
        <div className={styles.rating}>⭐ {rating.toFixed(1)}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.addToCart}`}>
          Add to Cart
        </button>
        <button className={`${styles.button} ${styles.viewDetails}`}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
