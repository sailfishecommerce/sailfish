export default function FooterForm() {
  return (
    <div className="widget pb-2 mb-4">
      <h3 className="widget-title text-light pb-1">Stay informed</h3>
      <div className="subscription-form validate">
        <div className="input-group flex-nowrap">
          <i className="ci-mail position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
          <input
            className="form-control rounded-start"
            type="email"
            name="EMAIL"
            placeholder="Your email"
            required
          />
          <button className="btn btn-primary" type="submit" name="subscribe">
            Subscribe*
          </button>
        </div>
        <div className="form-text text-light opacity-50">
          *Subscribe to our newsletter to receive early discount offers, updates
          and new products info.
        </div>
        <div className="subscription-status"></div>
      </div>
    </div>
  );
}
