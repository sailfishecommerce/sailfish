import swell from "swell-js";

export async function getCart() {
  return await swell.cart.get();
}
