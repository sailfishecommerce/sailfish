import swell from "swell-node";
import swellNodeInit from "@/lib/swellNode";

export default async function getAStoreCategory(categoryId: string) {
  swellNodeInit();
  return await swell.get(`/categories/${categoryId}`, {
    where: {
      store_name: "livehealthy_store",
    },
  });
}
