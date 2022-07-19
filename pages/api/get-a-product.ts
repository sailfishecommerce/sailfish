import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";

import swellNodeInit from "@/lib/swellNode";

export default async function fetchProductFromLiveHealthStore(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit();
  switch (req.method) {
    case "POST": {
      return await swell
        .post("/products", {
          id: req.body.id,
          active: true,
          where: { select_store: "livehealthy" },
        })
        .then((response: { results: any }) => {
          return res.status(200).json(response.results);
        })
        .catch((error: any) => {
          console.error("error", error);
          return res.status(400).json(error);
        });
    }
  }
}
