import { Op } from "sequelize";
import { Request, Response } from 'express';
import { TokenValidation } from '../libs/verifyToken';


import {signinValidation} from '../libs/validators'
import { createToken } from './auth';
import { Patients } from '../models/patients';
import { serverSettingsConfig } from "../libs/serverSettingsConfig";

import dotenv from 'dotenv';
dotenv.config();

 export const getToken = async (req:Request, res:Response) =>{ 

    try {
        
        const {
            user,
            password
        } = req.body;  

        if (await signinValidation(user, password)){
            
            await serverSettingsConfig (user, password);

            if (!req.header('token')){

                const token = await createToken(user);
                return res.header('token',token).json({                
                    token
                });
            }
            else
            {return res.status(200).json({
                msg: 'The token has been generated. Try with header token or clean it.'
            });}
        }
        else {
              
        return res.status(401).json({
            'Message' : 'Error en el usuario o contraseña'            
            });
        }


    } catch (error) {
        console.log(error);
    }

   
 }   



 export const getPacienteByHc = async (req: Request, res: Response)     => {

    try {
        const {
            user ,
            password, 
            hc = -1,
            dni = -1,
        } = req.body;  

        if (await signinValidation(user, password)){
            
            await serverSettingsConfig (user, password);

            if ( !req.header('token')){


                const token = await createToken(user);
                return res.header('token',token).json({token});
            }

            if(TokenValidation(req,res))
            {
                
                const patient = await Patients.findOne({
                    attributes: [
                    "nombres", 
                    "apellido1", 
                    "apellido2", 
                    "numero_historia_clinica",
                    "fecha_nacimiento", 
                    "numero_documento"
                    ],
                    where: { 
                        [Op.or]: [
                            {numero_historia_clinica: hc}, 
                            {numero_documento: dni}]                        
                     },
                  });
        
                  if (patient != null) {
                      patient.fecha_nacimiento = new Date (patient.fecha_nacimiento).toISOString().split('T')[0]
                      return res.status(200).json(patient);  
                  }  
                  else
                  {                      
                      return res.status(200).json({                
                        'Mensaje' : `Sin resultados para ${numero_documento == -1 ? 'la hc: ' + numero_historia_clinica: 'el dni: ' + numero_documento}`
                        });
                  }

            } 
            else 
            {
                return res.status(400).send('Invalid Token');
            }

        }else {
            return res.status(401).json({
                'Message' : 'Error en el usuario o contraseña'            
                });
        }

    } catch (error) {
        console.log(error);    
    }

 };

