import { Users } from "../models/users.js";
import * as helpers from "./helpers.js";


export const serverSettingsConfig = async (user: string, password: string) => {

    const resultUser = await Users.findOne({
        attributes: [            
            "user", 
            "password",             
            "time_token", 
            "response_delay", 
        ],
        where: { user },
      });

      const userDb          = resultUser.user;
      const passwordDb      = resultUser.password;
      const time_token      = resultUser.time_token;
      const response_delay  = resultUser.response_delay;

      if(user === userDb){    
        const validPassword = await helpers.matchPassword(
          password,
          passwordDb
        );

        if( validPassword){

          process.env['TOKEN_EXPIRED_INTERVAL_SECS'] = time_token; 
          process.env['RESPONSE_DELAY'] = response_delay;
    
        }  
      }

      
    
};