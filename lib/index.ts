import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NEON_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
