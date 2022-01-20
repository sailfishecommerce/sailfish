/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";
import { attributeType } from "@/types";

interface filterByColorType {
  attribute: attributeType;
}

export default function FilterByColor({ attribute }: filterByColorType) {
  function getBgColor(value: any) {
    const valueSmall = value.toLowerCase();
    return valueSmall;
  }
  return (
    <div className="widget border-bottom  mb-4 pb-4">
      <h3 className="widget-title">{attribute.name}</h3>
      <div className="d-flex flex-wrap">
        {attribute.values.map((value, index) => {
          const bgColor = useMemo(() => {
            const valueSmall = value.toLowerCase();
            return valueSmall;
          }, [value]);

          return (
            <div
              className="form-check width form-option text-center mb-2 mx-1"
              key={index}
            >
              <input
                className="form-check-input"
                type="radio"
                name="color"
                value={value}
                id={`color-${bgColor}-label`}
              />
              <label
                className="form-option-label rounded-circle"
                htmlFor={`color-${bgColor}-label`}
              >
                <span
                  className="form-option-color rounded-circle"
                  style={{
                    backgroundColor: `${bgColor}`,
                  }}
                ></span>
              </label>
              <label
                className="d-block fs-xs text-muted mt-n1"
                htmlFor={`color-${bgColor}-label`}
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .form-check.width {
            width: 4rem;
          }
        `}
      </style>
    </div>
  );
}
