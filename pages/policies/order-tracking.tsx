import PolicyView from "@/components/View/PolicyView";
import Applayout from "@/layout/Applayout";

export default function OrderTracking() {
  return (
    <Applayout title="Order Tracking">
      <h1 className="text-center mt-4 h2">Order Tracking</h1>
      <PolicyView dbNode="articles/order-tracking/content" />
    </Applayout>
  );
}
