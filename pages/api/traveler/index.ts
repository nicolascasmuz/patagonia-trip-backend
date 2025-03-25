import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { CreateTraveler } from "lib/controllers/traveler";
import Cors from "cors";
import { sequelize } from "lib/index";

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

/* sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
}); */

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  await methods({
    async post(req: NextApiRequest, res: NextApiResponse) {
      const traveler = await CreateTraveler(req.body);

      try {
        res.status(200).json(traveler);
      } catch (error) {
        res.status(400).json({ error });
      }
    },
  })(req, res);
}
