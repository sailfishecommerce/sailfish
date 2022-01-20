import { useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector } from "@/hooks/useRedux";
import ShopLoader from "@/components/ShopLoader";
import ProductList from "@/components/ProductList";
import Product from "./Product";
import { productType } from "@/types";

interface InfinteProductsListProps {
  products: productType[];
}

export default function InfinteProductPage({
  products,
}: InfinteProductsListProps) {
  const filterProducts = products.filter(
    (fproducts) => fproducts.images.length !== 0
  );
  const { productView } = useAppSelector((state) => state.shop);
  const [productCounter, setProductCounter] = useState(30);
  const productSlice = filterProducts?.slice(0, 30);
  const [storeProducts, setStoreProducts] = useState(productSlice);

  function fetchData() {
    const newProductSlice = filterProducts?.slice(
      productCounter,
      Number(productCounter + 30)
    );
    const newProductList: any = storeProducts?.concat(newProductSlice);
    setStoreProducts(newProductList);
    setProductCounter((productCount) => productCount + 30);
  }
  const style = useMemo(() => {
    const scrollStyle: any = {
      overflow: { overflow: "none" },
      text: { textAlign: "center" },
    };
    return scrollStyle;
  }, []);
  return (
    <>
      {filterProducts.length > 0 ? (
        <InfiniteScroll
          dataLength={storeProducts.length}
          next={fetchData}
          hasMore={true}
          style={style.overflow}
          className="row"
          loader={<ShopLoader />}
          endMessage={
            <p style={style.text}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {storeProducts?.map((product: productType, index: number) => {
            return productView === "grid" ? (
              <Product key={index} product={product} />
            ) : (
              <ProductList key={index} product={product} />
            );
          })}
        </InfiniteScroll>
      ) : (
        <ShopLoader />
      )}
    </>
  );
}
