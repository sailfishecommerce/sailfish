/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Applayout from "@/layout/Applayout";
import aboutUsContent from "@/json/about-us.json";

interface contentProps {
  content: {
    image: string;
    title: string;
    text: string;
    imgPosition: string;
    buttons?: {
      text: string;
      link: string;
      color: string;
    }[];
    imgLinks?: string[];
  };
}

function DisplayAboutus({ content }: contentProps) {
  const imageOrder =
    content.imgPosition === "left" ? "order-md-1" : "order-md-2";
  const textOrder =
    content.imgPosition === "left" ? "order-md-2" : "order-md-1";

  return (
    <section className="row g-0">
      <div
        className={`about-us-bg col-md-6 bg-position-center bg-size-cover bg-secondary ${imageOrder}`}
      ></div>
      <div className={`col-md-6 px-3 px-md-5 py-5 ${textOrder}`}>
        <div className="content-text mx-auto py-lg-5">
          <h2 className="h3 pb-3">{content.title}</h2>
          <p className="fs-sm pb-3 text-muted">{content.text}</p>
          {content.buttons?.map((button) => (
            <Link key={button.color} href={button.link} passHref>
              <a className={`btn ${button.color} btn-shadow`}>{button.text}</a>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .about-us-bg {
            min-height: 15rem;
            background-image: url(${content.image});
          }
          .content-text {
            max-width: 35rem;
          }
        `}
      </style>
    </section>
  );
}

export default function About() {
  return (
    <Applayout title="About us">
      <main className="container-fluid px-0">
        {aboutUsContent.aboutUs.map((content) => (
          <DisplayAboutus key={content.title} content={content} />
        ))}
        <hr />
        {/*<!-- Section: Team-->*/}
        <section className="container py-3 py-lg-5 mt-4 mb-3">
          <h2 className="h3 my-2">{aboutUsContent.coreTeam.title}</h2>
          <p className="fs-sm text-muted">
            {aboutUsContent.coreTeam.description}
          </p>
          <div className="row pt-3">
            {aboutUsContent.coreTeam.teams.map((team) => (
              <div key={team.name} className="col-lg-4 col-sm-6 mb-grid-gutter">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src={team.image}
                    width="96"
                    alt={team.name}
                  />
                  <div className="ps-3">
                    <h6 className="fs-base pt-1 mb-1">{team.name}</h6>
                    <p className="fs-ms text-muted mb-0">{team.role}</p>
                    <a
                      className="nav-link-style fs-ms text-nowrap"
                      href={`mailto:${team.email}`}
                    >
                      <i className="ci-mail me-2"></i>
                      {team.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <hr />
        <section className="row g-0">
          <div className="section-bg col-md-6 bg-position-center bg-size-cover bg-secondary order-md-2"></div>
          <div className="col-md-6 px-3 px-md-5 py-5 order-md-1">
            <div className="text-content mx-auto py-lg-5">
              <h2 className="h3 mb-2">We are hiring new talents</h2>
              <p className="fs-sm text-muted pb-2">
                If you want to be part of our team please submit you CV using
                the form below:
              </p>
              <form
                className="needs-validation row g-4"
                method="post"
                noValidate
              >
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <input className="form-control" type="file" required />
                </div>
                <div className="col-12">
                  <button className="btn btn-info btn-shadow" type="submit">
                    Submit your CV
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <style jsx>
        {`
          .section-bg {
            min-height: 15rem;
            background-image: url(${aboutUsContent.hireTalent.bgImage});
          }
          .text-content {
            max-width: 35rem;
          }
        `}
      </style>
    </Applayout>
  );
}
