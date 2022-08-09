import { connectPagination } from "react-instantsearch-dom";

export default function AlgoliaPaginationWidget({
  currentRefinement,
  nbPages,

  refine,
  createURL,
}: any) {
  const paginationArray = new Array(nbPages).fill(null);
  const shouldDisableButton = paginationArray.length > 1 ? false : true;
  const pagStyle = shouldDisableButton ? "disabled" : "";
  return (
    <nav
      className="d-flex justify-content-between pt-2"
      aria-label="Page navigation"
    >
      <ul className="pagination">
        <li className={`page-item ${pagStyle}`}>
          <button disabled={shouldDisableButton} className="page-link">
            <i className="ci-arrow-left me-2"></i>
            Prev
          </button>
        </li>
      </ul>

      <ul className="pagination">
        {paginationArray.map((_, index) => {
          const page = index + 1;
          const style: any = currentRefinement === page ? ".bold" : ".normal";
          return (
            <li
              className="page-item active d-none d-sm-block"
              aria-current="page"
              key={index}
            >
              <a
                href={createURL(page)}
                className={`page-link ${style}`}
                onClick={(event) => {
                  event.preventDefault();
                  refine(page);
                }}
              >
                {page}
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
          );
        })}
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }
            .normal {
              font-weight: normal;
            }
          `}
        </style>
      </ul>
      <ul className="pagination">
        <li className={`page-item ${pagStyle}`}>
          <button
            disabled={shouldDisableButton}
            className="page-link"
            aria-label="Next"
          >
            Next
            <i className="ci-arrow-right ms-2"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
export const CustomPagination = connectPagination(AlgoliaPaginationWidget);
