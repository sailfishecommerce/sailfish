import PolicyView from "@/components/View/PolicyView";
import Applayout from "@/layout/Applayout";

export default function TermsAndCondition() {
  return (
    <Applayout title="Terms and Condition">
      <h1 className="text-center mt-4 h2">Terms and Conditions</h1>
      <PolicyView dbNode="articles/terms-and-condition/content" />
    </Applayout>
  );
}
