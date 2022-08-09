import { Splide, SplideSlide } from "@splidejs/react-splide";

import Product from "@/components/Product";
import "@splidejs/splide/dist/css/splide.min.css";

interface HitProps {
  title: string;
  tags?: string[];
  tabColor?: string;
  products: any[];
  productName?: string;
  productClassName?: string;
  randomColor?: boolean;
}
interface Props {
  title: string;
  tabColor?: string;
  products: any[];
  productName?: string;
  productClassName?: string;
  randomColor?: boolean;
}

function VendorProductSlider({ productClassName, products }: HitProps) {
  return (
    <div className="w-full">
      <Splide
        options={{
          perPage: 6,
          gap: "5px",
          breakpoints: {
            280: {
              perPage: 1,
            },
            500: {
              perPage: 2,
              padding: "2rem",
            },
            800: {
              perPage: 3,
              padding: "2rem",
            },
            1200: {
              perPage: 4,
            },
            1440: {
              perPage: 5,
            },
          },
        }}
        className="productSlider itemSlider container mx-auto"
      >
        <>
          {products.map((product: any) => (
            <SplideSlide key={product.id}>
              <Product product={product} className={productClassName} />
            </SplideSlide>
          ))}
        </>
      </Splide>
    </div>
  );
}

export default function ProductSlider({
  title,
  tabColor,
  productName,
  products,
}: Props) {
  return (
    <div className="itemSlider relative container">
      <div className="row">
        <div className="top mb-4 flex items-center justify-between">
          {productName ? (
            <h4 className="font-bold">
              {title} <span className="mountain-green">{productName}</span>{" "}
              users
            </h4>
          ) : (
            <h4 className="font-bold text-xl 2xl:text-2xl">{title}</h4>
          )}
        </div>
        <VendorProductSlider
          products={products}
          tabColor={tabColor}
          productClassName="col-12"
          title={title}
        />
      </div>
    </div>
  );
}
