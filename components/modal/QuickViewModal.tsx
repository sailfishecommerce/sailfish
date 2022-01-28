/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Modal } from "react-bootstrap";

import FormattedPrice from "@/lib/formatPrice";
import { quickViewModal } from "@/redux/ui-slice";
import Rating from "../Rating";
import ProductForm from "../ProductForm";
import { useAppDispatch } from "@/hooks/useRedux";
import ProductGallery from "@/components/ProductGallery";
import discountPrice from "@/lib/discountPrice";

interface QuickViewModalProps {
  product: {
    active: boolean;
    productToView: any;
  };
}

export default function QuickViewModal({ product }: QuickViewModalProps) {
  const dispatch = useAppDispatch();
  const { productToView } = product;

  function quickViewHandler(product: any) {
    dispatch(quickViewModal(product));
  }

  return (
    <Modal
      show={product.active}
      onHide={quickViewHandler}
      size="xl"
      role="dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="modal-title product-title">
            <Link href={`/products/${productToView.slug}`} passHref>
              <a
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Go to product page"
              >
                {productToView.name}
                <i className="ci-arrow-right fs-lg ms-2"></i>
              </a>
            </Link>
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <ProductGallery product={productToView} quickView />
          <div className="col-lg-5 pt-4 pt-lg-0">
            <div className="product-details ms-auto pb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Rating product={productToView} />
                <button
                  className="btn-wishlist"
                  type="button"
                  data-bs-toggle="tooltip"
                  title="Add to wishlist"
                >
                  <i className="ci-heart"></i>
                </button>
              </div>
              <div className="price-group mb-2 d-flex justify-content-between align-items-center">
                <div className="d-flex price align-items-center">
                  <div className="text-accent me-2 fs-lg">
                    <FormattedPrice price={productToView.price} isProduct />
                  </div>
                  {productToView.hkd_compare_at_price > 0 && (
                    <del className="small text-accent fs-ms">
                      <FormattedPrice
                        price={productToView.hkd_compare_at_price}
                        oldPrice
                        isProduct
                      />
                    </del>
                  )}
                </div>
                {productToView.hkd_compare_at_price > 0 && (
                  <div className="percentage">{`${discountPrice(
                    productToView
                  )} %`}</div>
                )}
              </div>
              <ProductForm product={productToView} />
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: productToView["description"],
                }}
              />
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .description {
              height: 400px;
              overflow: auto;
            }
            .description::-webkit-scrollbar {
              width: 1em;
            }

            .description::-webkit-scrollbar-track {
              box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            }

            .percentage {
              height: 35px;
              width: 50px;
              color: white;
              background-color: #fb696a;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
            }

            .percentage:hover {
              background-color: #fe3638;
            }

            .description::-webkit-scrollbar-thumb {
              background-color: darkgrey;
              outline: 1px solid slategrey;
              border: 0px !important;
            }
          `}
        </style>
      </Modal.Body>
    </Modal>
  );
}
