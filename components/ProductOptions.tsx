type productOptions = {
  name: string;
  id: string;
  values: { id: string; name: string }[];
};

export default function ProductOptions({ product }: any) {
  return (
    <div>
      {product.options.length > 0
        ? product.options.map((option: productOptions) => {
            return (
              option.name === "Color" && (
                <div key={option.id} className="fs-sm mb-4">
                  <span className="text-heading fw-medium me-1">Color:</span>
                  <span className="text-muted" id="colorOptionText">
                    {option.values.map((value, index) => {
                      return option.values.length - 1 === index ? (
                        <div key={value.id}>{`${value.name} `}</div>
                      ) : (
                        <div key={value.id}>{`${value.name} / `}</div>
                      );
                    })}
                  </span>
                </div>
              )
            );
          })
        : null}
    </div>
  );
}
