import { DataTypes, Model } from "sequelize";
import { sequelize } from "lib/index";

export class Owner extends Model {}

Owner.init(
  {
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    business: DataTypes.STRING,
    services: DataTypes.STRING,
    other: DataTypes.STRING,
    picURL: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  { sequelize, modelName: "owner" }
);
