import PolicyView from "@/components/Views/PolicyView";
import Applayout from "@/layout/Applayout";

export default function ShippingDeliveryPage() {
  return (
    <Applayout title="Shipping and Delivery">
      <h1 className="text-center mt-4 h2">Shipping and Delivery Policy</h1>
      <PolicyView dbNode="articles/shipping-info/content" />
    </Applayout>
  );
}
