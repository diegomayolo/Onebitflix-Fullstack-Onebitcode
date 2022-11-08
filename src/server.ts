import express from 'express';
import { adminJs, adminJsRouter } from './adminjs';
import { sequelize } from './database';
import { router } from './routes';
import cors from 'cors';

const app = express();

/* Telling the server to use the public folder as the root folder. */
app.use( express.static( 'public' ) );

/* A middleware that allows cross-origin requests. */
app.use( cors() );

/* A middleware that parses the body of the request and makes it available in the request object. */
app.use( express.json() );

/* Telling the server to use the router. */
app.use( router );

/* Telling the server to use the adminJsRouter when the rootPath is used. */
app.use( adminJs.options.rootPath, adminJsRouter );

/* Setting the port to the environment variable PORT or 3000 if the environment variable PORT is not
set. */
const PORT = process.env.PORT || 3000;

app.listen( PORT, () => 
{
   sequelize.authenticate().then( () => {
      console.log( "Connection has been established successfully." );
   } );
   
   console.log( `Server running on port ${PORT}` );
} );