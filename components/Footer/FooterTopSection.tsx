import FooterForm from "@/components/Footer/FooterForm";
import FooterLinks from "@/components/Footer/FooterLinks";

export default function FooterTopSection() {
  return (
    <>
      <div className="topSection pt-5">
        <div className="container">
          <div className="row pb-2">
            <FooterLinks />
            <div className="col-md-4 ">
              <FooterForm />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .topSection {
            background-color: #373f50;
          }
          .antispam-container {
            position: absolute;
            left: -5000px;
          }
        `}
      </style>
    </>
  );
}
