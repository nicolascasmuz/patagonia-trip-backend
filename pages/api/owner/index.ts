import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { CreateOwner, getOwners } from "lib/controllers/owner";
import Cors from "cors";
import { sequelize } from "lib/index";
import { businessIndex } from "lib/algolia";

const cors = Cors({
  methods: ["GET", "POST", "PATCH", "OPTIONS", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

/* sequelize.sync({ force: true }).then((res) => {
  console.log(res);
}); */

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  await methods({
    async get(req: NextApiRequest, res: NextApiResponse) {
      const bestOwners = await getOwners();

      try {
        res.status(200).json(bestOwners);
      } catch (error) {
        res.status(400).json({ error });
      }
    },
    async post(req: NextApiRequest, res: NextApiResponse) {
      const owner = await CreateOwner(req.body);

      await businessIndex.saveObject({
        objectID: owner.foundOwner.get("id"),
        email: owner.foundOwner.get("email"),
        type: owner.foundOwner.get("type"),
        business: owner.foundOwner.get("business"),
        services: owner.foundOwner.get("services"),
        other: owner.foundOwner.get("other"),
        picURL: owner.foundOwner.get("picURL"),
        _geoloc: {
          lng: owner.foundOwner.get("lng"),
          lat: owner.foundOwner.get("lat"),
        },
      });

      try {
        res.status(200).json(owner);
      } catch (error) {
        res.status(400).json({ error });
      }
    },
  })(req, res);
}
