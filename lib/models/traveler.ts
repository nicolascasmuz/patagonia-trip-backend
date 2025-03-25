import { DataTypes, Model } from "sequelize";
import { sequelize } from "lib/index";

export class Traveler extends Model {}

Traveler.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    vehicle: DataTypes.STRING,
  },
  { sequelize, modelName: "traveler" }
);
