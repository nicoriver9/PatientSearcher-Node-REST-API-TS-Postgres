import express, {Request,Response, NextFunction ,Application} from 'express';
import indexRoutes from './routes/index';
import indexRoutesAPI from './routes/index-token';
import  sequelize  from "./database/database";

import dotenv from 'dotenv';
dotenv.config();

const appTokenGenerator: Application    = express();
const app: Application                  = express();

// middlewares appToken
appTokenGenerator.use(express.json());
appTokenGenerator.use(express.urlencoded({extended: false}));

//moddlewares appServer
app.use((req:Request, res:Response, next:NextFunction)=>{
    setTimeout(next, Number(process.env.RESPONSE_DELAY) )
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes appToken
appTokenGenerator.use(indexRoutesAPI);

//Routes appServer
app.use(indexRoutes);


appTokenGenerator.listen(process.env.SERVER_TOKEN_PORT);
console.log('API-Token on port', process.env.SERVER_TOKEN_PORT  || 8080);

app.listen(process.env.SERVER_PORT, async()=>{
    await sequelize.sync({force: false});
    console.log('Server on port', process.env.SERVER_PORT || 8080);
});