import { useProductFetch } from "../../hools/hooks";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductsListing.module.css";

function Products() {
  const { data: productData, isLoading: isProductLoading } = useProductFetch();
  if (isProductLoading) {
    return (
      <div className="loaderWrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  const productArr = productData?.products || [];
  return (
    <div className={styles.productsWrapper}>
      {productData && productArr.length > 0 ? (
        productArr.map((item) => (
          <ProductCard
            key={item?.id}
            id={item?.id}
            description={item?.description}
            price={item?.price}
            rating={item?.rating}
            thumbnail={item?.thumbnail}
            title={item?.title}
          />
        ))
      ) : (
        <h3>No Product found</h3>
      )}
    </div>
  );
}

export default Products;
