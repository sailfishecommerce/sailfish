import swell from "swell-node";
import swellNodeInit from "@/lib/swellNode";

export default async function filterProducts(query: any) {
  swellNodeInit();
  return await swell.get(`/products`, {
    where: {
      ...query,
    },
  });
}
