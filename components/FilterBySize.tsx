import { attributeType } from "@/types";

interface filterBySizeProps {
  attribute: attributeType;
  onChangeFilter: (e: any) => void;
}

export default function FilterBySize({
  attribute,
  onChangeFilter,
}: filterBySizeProps) {
  return (
    <div className="widget widget-filter">
      <h3 className="widget-title">{attribute.name}</h3>
      <ul
        className="widget-list data widget-filter-list list-unstyled pt-1"
        data-simplebar
        data-simplebar-auto-hide="false"
      >
        {attribute.values.map((value, index) => (
          <li
            key={index}
            className="widget-filter-item d-flex justify-content-between align-items-center mb-1"
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="size-xs"
              />
              <label
                className="form-check-label widget-filter-item-text"
                htmlFor="size-xs"
              >
                {value}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .widget-list.data {
          maxheight: 11rem;
        }
      `}</style>
    </div>
  );
}
