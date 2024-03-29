/* eslint-disable @next/next/no-img-element */

import useShoppingCart from "@/hooks/useShoppingCart";
import { productOptions, productType } from "@/types";
import { useState } from "react";

export function PaymentNote() {
  return (
    <div className="payment-partners d-flex flex-column mt-5">
      <img
        src="/img/payment-card.png"
        className="payment-card"
        alt="we are accept visa, mastercard cards and bank transfers"
      />
      <div className="secured-by d-flex align-items-center mt-2">
        <i className="fas fa-lock me-2"></i>
        <p className="text-muted me-2 mb-0">
          Transactions secured by Stripe & Airwallex
        </p>
      </div>
      <div className="border w-100 p-3 mt-4 rounded">
        <p>
          {" "}
          We accept bank deposits through all major networks globally including
          ACH,Fedwire, SWIFT,IBAN and BSB.{" "}
        </p>
        <p className="mb-0">
          Orders are shipped after transfers are manually verified. Additional
          documentation might be requested{" "}
        </p>
      </div>
      <style jsx>
        {`
          img.payment-card {
            width: 120px;
          }
        `}
      </style>
    </div>
  );
}

export function ProductBoxTable() {
  return (
    <div className="productAttribute">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>1 box</td>
            <td>100 qty</td>
          </tr>
          <tr>
            <td>1 Carton</td>
            <td>10 boxes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface ProductOptionSelectType {
  option: productOptions;
  selectedItemHandler: (e: any) => void;
}

export function ProductOptionSelect({
  option,
  selectedItemHandler,
}: ProductOptionSelectType) {
  return (
    <div className="mb-3">
      <label className="fw-medium pb-1" htmlFor="product-size">
        Size:
      </label>
      <select
        onChange={selectedItemHandler}
        name="Size"
        className="form-select"
        required
        id="product-size"
      >
        <option value="">Select size</option>
        {option.values.map((value: { id: string; name: string }) => (
          <option key={value.id} value={value.name}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ProductOptionSelectBoxProps {
  productQtyHandler: (e: any) => void;
  quantityArr: number[];
}

export function ProductOptionSelectBox({
  productQtyHandler,
  quantityArr,
}: ProductOptionSelectBoxProps) {
  return (
    <div className="d-flex flex-column w-50">
      <label htmlFor="selectProductQuantity fw-bold">Cartons</label>
      <select
        name="productQty"
        className="form-select"
        id="selectProductQuantity"
        onChange={productQtyHandler}
        required
      >
        <option value="">Select Quantity</option>
        {quantityArr.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
interface ProductQuantityCounterType {
  product: productType;
}
export function ProductQuantityCounter({
  product,
}: ProductQuantityCounterType) {
  const [itemQty, setItemQty] = useState(1);
  const { addItemToCartModal } = useShoppingCart();

  function updateCounter(type: "increment" | "decrement") {
    if (type === "increment") {
      setItemQty(itemQty + 1);
    } else if (type === "decrement" && itemQty > 1) {
      setItemQty(itemQty - 1);
    }
  }

  function addToCart() {
    addItemToCartModal.mutate({
      product,
      productQty: itemQty,
      selectedOptions: [],
    });
  }

  return (
    <div className="d-flex align-items-center mb-2">
      <div className="cartCounter w-50 d-flex align-items-center mb-0">
        <button
          onClick={() => updateCounter("decrement")}
          type="button"
          className="p-2 d-flex align-items-center justify-content-center btn btn-danger text-white"
        >
          -
        </button>
        <input
          className="w-25 mx-2 text-center border"
          readOnly
          value={itemQty}
        />
        <button
          onClick={() => updateCounter("increment")}
          type="button"
          className={`p-2 d-flex align-items-center justify-content-center btn btn-success text-white`}
        >
          +
        </button>
      </div>
      <button
        className="addToCartBtn btn btn-primary btn-shadow d-block w-50"
        type="button"
        onClick={addToCart}
      >
        <i className="ci-cart fs-lg me-2"></i>
        Add to Cart
      </button>
      <style jsx>
        {`
          .addToCartBtn {
            height: 43px;
          }
          .cartCounter button {
            font-size: 30px;
            height: 30px;
          }
        `}
      </style>
    </div>
  );
}

export function ShareProductLink() {
  return (
    <div className="d-flex align-items-center">
      <label className="form-label d-inline-block align-middle my-2 me-3">
        Share:
      </label>
      <a className="btn-share btn-twitter me-2 my-2" href="#">
        <i className="ci-twitter"></i>
        Twitter
      </a>
      <a className="btn-share btn-instagram me-2 my-2" href="#">
        <i className="ci-instagram"></i>
        Instagram
      </a>
      <a className="btn-share btn-facebook my-2" href="#">
        <i className="ci-facebook"></i>
        Facebook
      </a>
    </div>
  );
}
