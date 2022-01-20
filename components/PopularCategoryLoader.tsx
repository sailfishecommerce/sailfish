import { useMemo } from "react";
import ContentLoader from "react-content-loader";

function PopularCategoryLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: "100%" }), []);

  return (
    <ContentLoader
      speed={2}
      width={200}
      height={200}
      viewBox="0 0 200 150"
      style={loaderStyle}
      backgroundColor="#b5a6a6"
      foregroundColor="#ecebeb"
      className="mx-2"
      {...props}
    >
      <rect x="48" y="125" rx="3" ry="3" width="60%" height="6" />
      <rect x="10" y="0" rx="0" ry="0" width="100%" height="80%" />
    </ContentLoader>
  );
}

export default function LoadingPopularCategory() {
  const newPopularCategories = new Array(3).fill(0);

  return (
    <div className="d-flex align-items-center">
      {newPopularCategories.map((category, index) => (
        <PopularCategoryLoader key={index} />
      ))}
    </div>
  );
}
