import footerBottomContent from "@/json/footer-bottom.json";

export default function SocialIcons() {
  return (
    <div className="mb-3">
      {footerBottomContent.social.map((data, index) => (
        <a
          key={`${data.name}-${index}`}
          rel="noreferrer"
          target="_blank"
          className={`btn-social bs-light bs-${data.name} ms-2 mb-2`}
          href={data.link}
        >
          <i className={`ci-${data.name}`}></i>
        </a>
      ))}
    </div>
  );
}
