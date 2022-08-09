/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import checkoutFormInputs from "@/json/address-input-group.json";

interface Props {
  formik: any;
}

export default function AddressInputGroup({ formik }: Props): JSX.Element {
  // const { userAddress }: any = useAppSelector((state) => state.payment);

  function updateInput(e: any) {
    e.preventDefault();
    formik.setValues({
      ...formik.values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      {checkoutFormInputs.map((formRow, index) => (
        <div key={index} className="row">
          {formRow.map((formInput, index) => (
            <div key={index} className="col-sm-6">
              <div className="mb-3">
                <label className="form-label" htmlFor={formInput.name}>
                  {formInput.label}
                </label>
                <input
                  value={formik.values[formInput.name]}
                  className="form-control"
                  onChange={updateInput}
                  name={formInput.name}
                />
                <p className="text-danger text">
                  {formik.errors[formInput.name] &&
                    formik.errors[formInput.name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <style jsx>
        {`
          .text {
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
}
