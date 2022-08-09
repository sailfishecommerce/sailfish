import PolicyView from "@/components/Views/PolicyView";
import Applayout from "@/layout/Applayout";

export default function PrivacyPolicy() {
  return (
    <Applayout title="Privacy Policy">
      <h1 className="text-center mt-4 h2">Privacy Policy</h1>
      <PolicyView dbNode="articles/privacy-and-policy/content" />
    </Applayout>
  );
}
