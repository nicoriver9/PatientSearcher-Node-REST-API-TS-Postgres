import { DataTypes } from "sequelize";
import  sequelize  from "../database/database.js";

export const Patients = sequelize.define(
  "paciente",
  {    
    paciente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_historia_clinica: {
      type: DataTypes.INTEGER,
    },
    apellido1: {
      type: DataTypes.STRING,      
    },
    apellido2: {
        type: DataTypes.STRING,      
    },
    nombres: {
        type: DataTypes.STRING,      
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,      
    },
    numero_documento: {
        type: DataTypes.INTEGER,      
    },  
  },
  {
    schema: 'sc_lagogestion',
    tableName: 'paciente',
    timestamps: false,
  },
  
);