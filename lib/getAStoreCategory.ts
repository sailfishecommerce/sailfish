import swell from "swell-node";
import swellNodeInit from "@/lib/swellNode";

export default async function getAStoreCategory() {
  swellNodeInit();
  const categories = await swell.get("/categories/{id}", {
    where: {
      store_name: "livehealthy store",
    },
  });
  return Promise.all(categories.results);
}
