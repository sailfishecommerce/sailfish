/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Applayout from "@/layout/Applayout";
import ContactBanner from "@/components/ContactBanner";
import ContactusCard from "@/components/ContactusCard";

const DynamicContactMap = dynamic(() => import("../components/ContactMap"));
const DynamicContactForm = dynamic(() => import("../components/ContactForm"));
const DynamicPartnerOutlet = dynamic(
  () => import("../components/PartnerOutlet")
);

export default function ContactUs() {
  return (
    <Applayout title="Contact us">
      <ContactBanner />
      <ContactusCard />
      <DynamicPartnerOutlet />
      <div className="container-fluid px-0" id="map">
        <div className="row g-0">
          <DynamicContactMap />
          <DynamicContactForm />
        </div>
      </div>
    </Applayout>
  );
}
