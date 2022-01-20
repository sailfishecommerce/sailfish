/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import useProduct from "@/hooks/useProduct";
import useStoreCart from "@/hooks/useStoreCart";
import { ProductProps } from "@/types";

export default function ProductViewForm({
  product,
  forCategory,
}: ProductProps) {
  const { quickViewHandler, optionHandler } = useProduct(product);
  const { addToCart } = useStoreCart(product);
  const categoryStyle = forCategory ? "d-flex flex-column" : "d-flex";

  const formOptionBg = useCallback((name: string) => {
    const style = { backgroundColor: name.toLowerCase() };
    return style;
  }, []);

  function onSubmitHandler(e: any) {
    e.preventDefault();
    addToCart();
  }

  return (
    <div className="card-body card-body-hidden">
      <form onSubmit={onSubmitHandler}>
        {product?.options?.length > 0 ? (
          product?.options?.map((option) => {
            return option.name === "Color" ? (
              <div key={option.id} className="text-center pb-2">
                {option.values.map((value: { name: string; id: string }) => (
                  <div
                    key={value.id}
                    className="form-check form-option form-check-inline mb-2"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      value={value.name}
                      onChange={optionHandler}
                      name={option.name}
                      id={value.id}
                      required
                    />
                    <label
                      className="form-option-label rounded-circle"
                      htmlFor={value.id}
                    >
                      <span
                        className="form-option-color rounded-circle"
                        style={formOptionBg(value.name)}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
            ) : option.name === "Size" ? (
              <div key={option.id} className={`mb-2 ${categoryStyle}`}>
                <select
                  onChange={optionHandler}
                  name="Size"
                  className="form-select form-select-sm me-2 mb-2"
                  required
                >
                  <option value="">Select Size</option>
                  {option.values.map((value: { name: string; id: string }) => (
                    <option value={value.name} key={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary btn-sm" type="submit">
                  <i className="ci-cart fs-sm me-1"></i>
                  Add to Cart
                </button>
              </div>
            ) : null;
          })
        ) : (
          <button
            className="btn btn-primary btn-sm m-auto d-flex align-items-center"
            type="submit"
          >
            <i className="ci-cart fs-sm me-1"></i>
            Add to Cart
          </button>
        )}
      </form>
      <div className="text-center">
        <button
          className="nav-link-style fs-ms btn btn-link"
          onClick={() => quickViewHandler(product)}
          data-bs-toggle="quickViewModal"
        >
          <i className="ci-eye align-middle me-1"></i>
          Quick view
        </button>
      </div>
    </div>
  );
}
