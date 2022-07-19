import swell from "swell-node";

import swellNodeInit from "@/lib/swellNode";

export default async function getAProduct(productId: string) {
  swellNodeInit();
  return await swell.get(`/products/${productId}`, {
    where: { select_store: "livehealthy", active: true },
  });
}
