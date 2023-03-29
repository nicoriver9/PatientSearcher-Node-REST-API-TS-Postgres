
import { Users } from "../models/users.js";
import * as helpers from "./helpers.js";


export const signinValidation = async (user: string, password: string) => {

    const resultUser = await Users.findOne({
        attributes: [
            "api_user_id", 
            "user", 
            "password",             
        ],
        where: {user},
      });

      const userDb     = resultUser.user;
      const passwordDb = resultUser.password;

      if(user === userDb){    
        const validPassword = await helpers.matchPassword(
          password,
          passwordDb
        );

        return validPassword;  
      }

      return false;
    
};