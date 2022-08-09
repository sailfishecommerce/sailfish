import { useState } from "react";
import Nouislider from "nouislider-react";
import Router, { useRouter } from "next/router";
import Script from "next/script";

interface PriceSliderProps {
  onChangeFilter: (e: any) => void;
}

export default function PriceSlider({ onChangeFilter }: PriceSliderProps) {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(200);
  const router: any = useRouter();

  function updateQuery(priceMin: string, priceMax: string) {
    const routeQuery =
      router.query.slug?.length > 0
        ? {
            slug: router.query?.slug,
            ["price-min"]: encodeURI(priceMin),
            ["price-max"]: encodeURI(priceMax),
          }
        : {
            ["price-min"]: encodeURI(priceMin),
            ["price-max"]: encodeURI(priceMax),
          };
    Router.push({
      query: routeQuery,
    });
  }

  const priceSlider = (
    render: any,
    handle: any,
    value: any[],
    un: any,
    percent: any
  ) => {
    setPriceMin(value[0].toFixed(0));
    setPriceMax(value[1].toFixed(0));
  };
  return (
    <>
      <Script
        src=" https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.5.0/nouislider.min.js"
        strategy="afterInteractive"
      />
      <div className="widget mb-4 pb-4 border-bottom">
        <h3 className="widget-title">Price</h3>
        <Nouislider
          step={10}
          range={{ min: 0, max: 200 }}
          start={[20, 150]}
          className="cz-range-slider-ui"
          pips={{ mode: "count", values: 5 }}
          connect
          onUpdate={priceSlider}
          tooltips={true}
        />
        <div className="d-flex">
          <div className="d-flex pb-1">
            <div className="w-50 pe-2 me-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text">$</span>
                <input
                  className="form-control range-slider-value-min"
                  type="text"
                  value={priceMin}
                />
              </div>
            </div>
            <div className="w-50 ps-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text">$</span>
                <input
                  className="form-control range-slider-value-max"
                  type="text"
                  value={priceMax}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
