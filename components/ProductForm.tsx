import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";

import { productType, productOptions } from "@/types";
import {
  ProductBoxTable,
  ProductOptionSelect,
  ProductQuantityCounter,
  ProductOptionSelectBox,
} from "./ProductView";
import useProductOptions from "@/hooks/useProductOptions";
import { useCart } from "@/hooks";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import useShoppingCart from "@/hooks/useShoppingCart";

interface ProductFormType {
  product: productType;
}

const quantityArr = [10, 20, 30, 40, 50];

export default function ProductForm({ product }: ProductFormType) {
  const router = useRouter();
  const { productAddedToCartAfterSearch, productAddedToCart } =
    useAlgoliaEvents();
  const queryID: any = router.query["query-id"];
  const { dataStatus, addItemToCartModal } = useShoppingCart();

  const { optionHandler, selectedOptions } = useProductOptions();

  const [productQty, setProductQty] = useState<number | null | any>(null);

  function productQtyHandler(e: any) {
    setProductQty(e.target.value);
  }

  function algoliaEvent() {
    console.log("algoliaEvent working");
    const itemId =
      product.objectID !== undefined ? [product.objectID] : [product.id];
    return queryID
      ? productAddedToCartAfterSearch(queryID, [product.objectID])
      : productAddedToCart(itemId);
  }

  const counterType = product.attributes;

  function onSubmitHandler(e: any) {
    e.preventDefault();
    algoliaEvent();
    addItemToCartModal.mutate({ product, productQty, selectedOptions });
  }

  const optionsClassName = counterType?.box
    ? "mb-3 align-items-end"
    : "mb-3 align-items-center";

  const formBg = useCallback((name: string) => {
    const style = { backgroundColor: name.toLowerCase() };
    return style;
  }, []);

  return (
    <div className="productform mb-3">
      {product?.options?.length > 0 ? (
        <form onSubmit={onSubmitHandler}>
          {product?.options?.map((option: productOptions) => {
            return option?.name === "Color" ? (
              <div key={option.id}>
                <div className="fs-sm mb-4 d-flex align-items-center">
                  <span className="text-heading fw-medium me-1">Color:</span>
                  <span
                    className="text-muted d-flex align-items-center"
                    id="colorOptionText"
                  >
                    {option?.values?.map((value, index) => {
                      return option.values.length - 1 === index ? (
                        <div key={value.id}>{value.name}</div>
                      ) : (
                        <div key={value.id}>
                          {value.name} <span className="mx-1">/</span>
                        </div>
                      );
                    })}
                  </span>
                </div>
                <div className="position-relative me-n4 mb-3">
                  {option?.name === "Color" &&
                    option?.values.map((value, index) => (
                      <div
                        key={value.id}
                        className="form-check form-option form-check-inline mb-2"
                      >
                        <input
                          className="form-check-input ms-1"
                          type="radio"
                          name={option.name}
                          id={value.id}
                          onChange={optionHandler}
                          value={value.name}
                          required
                        />
                        <label
                          className="form-option-label rounded-circle"
                          htmlFor={value.id}
                        >
                          <span
                            className="form-option-color rounded-circle"
                            style={formBg(value.name)}
                          ></span>
                        </label>
                      </div>
                    ))}
                  {product.price && (
                    <div className="product-badge product-available mt-n1">
                      <i className="ci-security-check"></i>
                      Product available
                    </div>
                  )}
                </div>
              </div>
            ) : (
              option.name === "Size" && (
                <ProductOptionSelect
                  key={option.id}
                  option={option}
                  selectedItemHandler={optionHandler}
                />
              )
            );
          })}
          {product?.attributes?.box && <ProductBoxTable />}
          {product?.attributes?.box && productQty && (
            <div className="alert bg-danger text-white">
              {productQty} cartons has a total of {Number(productQty) * 10}{" "}
              boxes with 100 pcs each
            </div>
          )}
          <div className={`cartCounter row pe-3 ${optionsClassName}`}>
            {counterType?.box && (
              <ProductOptionSelectBox
                quantityArr={quantityArr}
                productQtyHandler={productQtyHandler}
              />
            )}
            <button
              className="submitBtn btn btn-primary btn-shadow d-block w-50"
              type="submit"
            >
              <i className="ci-cart fs-lg me-2"></i>
              Add to Cart
            </button>
          </div>
          <style jsx>
            {`
              .submitBtn {
                height: 43px;
              }
            `}
          </style>
        </form>
      ) : (
        <ProductQuantityCounter product={product} />
      )}
    </div>
  );
}
