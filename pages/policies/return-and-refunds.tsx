import PolicyView from "@/components/Views/PolicyView";
import Applayout from "@/layout/Applayout";

export default function ReturnAndRefunds() {
  return (
    <Applayout title="Return and Refunds">
      <h1 className="text-center mt-4 h2">Returns and Refund Policy</h1>
      <PolicyView dbNode="articles/return-and-refunds/content" />
    </Applayout>
  );
}
