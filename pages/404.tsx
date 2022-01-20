import Error404 from "@/components/404Error";
import Applayout from "@/layout/Applayout";

export default function Error404Page() {
  return (
    <Applayout title="Error page">
      <Error404 />
    </Applayout>
  );
}
