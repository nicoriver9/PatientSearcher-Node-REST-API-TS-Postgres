import { DataTypes } from "sequelize";
import  sequelize  from "../database/database.js";

export const Users = sequelize.define(
  "api_user",
  {    
    api_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,      
    },
    observaciones: {
        type: DataTypes.STRING,      
    },
    fecha_ult_acceso: {
    type: DataTypes.DATE,      
    }, 
    
    //server settings per user
    time_token: {
      type: DataTypes.INTEGER,      
    }, 
    response_delay: {
      type: DataTypes.INTEGER,      
    }, 

  },
  {
    schema: 'sc_lagogestion',
    timestamps: false,
    tableName: 'api_users'
  },
  
);
