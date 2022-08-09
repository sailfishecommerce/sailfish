import { useCallback } from "react";
import Link from "next/link";

import infoContent from "@/json/info-section.json";

export default function InfoCards() {
  const cardBgColor: any = useCallback(
    (item: any) => ({
      backgroundColor: `${item.bgColor}`,
    }),
    []
  );
  return (
    <section className="container-fluid px-0">
      <div className="row g-0">
        {infoContent.map((item: any, index: number) => (
          <div key={index} className="col-md-6 px-0">
            {item.link ? (
              <Link href={item.link} passHref>
                <a
                  style={cardBgColor(item)}
                  className="card border-0 rounded-0 text-decoration-none py-md-4"
                >
                  <div className="card-body text-center">
                    <i className={item.icon}></i>
                    <h3 className="h5 mb-1">{item.title}</h3>
                    <p className="text-muted fs-sm"> {item.description}</p>
                  </div>
                </a>
              </Link>
            ) : (
              <a
                style={cardBgColor(item)}
                className="card border-0 rounded-0 text-decoration-none py-md-4"
              >
                <div className="card-body text-center">
                  <i className={item.icon}></i>
                  <h3 className="h5 mb-1">{item.title}</h3>
                  <p className="text-muted fs-sm"> {item.description}</p>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .card:hover {
            opacity: 0.5;
          }
        `}
      </style>
    </section>
  );
}

InfoCards.whyDidYouRender = true;
