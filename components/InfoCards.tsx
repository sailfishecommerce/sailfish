import { useCallback } from "react";
import Link from "next/link";

interface InfoCardsProps {
  section1Title: string;
  section1Description: string;
  section2Title: string;
  section2Description: string;
  section1BgColor: string;
  section2BgColor: string;
}
export default function InfoCards({
  section1Title,
  section1Description,
  section1BgColor,
  section2Title,
  section2Description,
  section2BgColor,
}: InfoCardsProps) {
  const content = [
    {
      title: section1Title,
      description: section1Description,
      bgColor: section1BgColor,
      icon: "ci-edit h3 mt-2 mb-4 text-primary",
      link: "/blog-list-sidebar",
    },
    {
      title: section2Title,
      description: section2Description,
      bgColor: section2BgColor,
      icon: "ci-instagram h3 mt-2 mb-4 text-accent",
    },
  ];
  const cardBgColor: any = useCallback(
    (item: any) => ({
      backgroundColor: `${item.bgColor}`,
    }),
    []
  );
  return (
    <section className="container-fluid px-0">
      <div className="row g-0">
        {content.map((item, index) => (
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
