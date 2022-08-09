import { useMemo } from "react";
import ContentLoader from "react-content-loader";

export function ColorLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: "100%" }), []);
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 70 70"
      style={loaderStyle}
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      title="loading product..."
      animate
      {...props}
    >
      <rect x="0%" y="5%" rx="30" ry="30" width="10%" height="10%" />
      <rect x="88%" y="0%" rx="100" ry="100" width="12%" height="12%" />
      <rect x="0" y="15%" rx="0" ry="0" width="100%" height="50%" />
    </ContentLoader>
  );
}

export function SizeLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: "100%" }), []);

  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 70 70"
      style={loaderStyle}
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      title="loading product..."
      animate
      {...props}
    >
      <rect x="0%" y="5%" rx="3" ry="3" width="20%" height="7%" />
      <rect x="0%" y="5%" rx="3" ry="3" width="20%" height="7%" />
      <rect x="88%" y="0%" rx="100" ry="100" width="12%" height="12%" />
    </ContentLoader>
  );
}

export default function LoadAttribute() {
  const sizeArray = new Array(4).fill(0);
  const colorArray = new Array(2).fill(0);

  return (
    <div className="row">
      <div className="d-flex flex-column">
        <h4 className="fw-bold mb-3">Color</h4>
        {colorArray.map((_, index: number) => (
          <ColorLoader key={index} />
        ))}
      </div>
      <div className="size d-flex flex-column">
        <h4 className="fw-bold mb-3">Size</h4>
        {sizeArray.map((_, index: number) => (
          <SizeLoader key={index} />
        ))}
      </div>
    </div>
  );
}
