import { PaginationProps } from "@/types";

export default function BlogPagination({ pagination }: PaginationProps) {
  return (
    <div>
      {pagination.map((paginate) =>
        paginate.active ? (
          <li
            key={paginate.count}
            className="page-item active d-none d-sm-block"
            aria-current="page"
          >
            <span className="page-link">
              {paginate.count}
              <span className="visually-hidden">(current)</span>
            </span>
          </li>
        ) : (
          <li key={paginate.count} className="page-item d-none d-sm-block">
            <a className="page-link" href="#">
              {paginate.count}
            </a>
          </li>
        )
      )}
    </div>
  );
}
