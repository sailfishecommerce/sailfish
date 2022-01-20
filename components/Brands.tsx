/* eslint-disable @next/next/no-img-element */

interface BrandProps {
  brand?: any;
  local: boolean;
}
export default function Brands({ brand, local }: BrandProps) {
  return (
    <div className="brand">
      <a
        className=" brand-link d-block bg-white shadow-sm rounded-3 py-3 py-sm-4"
        href="#"
      >
        {local ? (
          <img src={brand.img} alt={brand.name} className="d-block mx-auto" />
        ) : (
          <div className="brand-container d-block mx-auto">{brand}</div>
        )}
      </a>
      <style jsx>
        {`
          .brand-container {
            width: 150px;
          }
          .brand {
            height: 220px;
          }
          .brand-link {
            height: 200px;
          }
          @media (max-width: 768px) {
            .brand {
              height: 100px;
              width: 130px;
            }
            .brand-link {
              height: 80px;
            }
          }
        `}
      </style>
    </div>
  );
}
