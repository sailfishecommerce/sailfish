import React from "react";

export default function AlgoliaMobilePagination({
  currentRefinement,
  nbPages,
  refine,
  createURL,
}: any) {
  const paginationArray = new Array(nbPages).fill(null);
  const shouldDisableButton = paginationArray.length > 1 ? false : true;
  const pagStyle = shouldDisableButton ? "disabled" : "";
  return (
    <div className="d-flex pb-3">
      <a className="nav-link-style nav-link-light me-3" href="#">
        <i className="ci-arrow-left"></i>
      </a>
      <span className="fs-md text-light">
        {nbPages} / {paginationArray.length}
      </span>
      <a className="nav-link-style nav-link-light ms-3" href="#">
        <i className="ci-arrow-right"></i>
      </a>
    </div>
  );
}
