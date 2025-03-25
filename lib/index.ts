/* import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NEON_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize }; */

import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize(process.env.NEON_STRING, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
