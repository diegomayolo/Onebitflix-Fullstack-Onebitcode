import express from 'express';
import { adminJs, adminJsRouter } from './adminjs';
import { sequelize } from './database';
import { router } from './routes';

const app = express();

app.use( express.static( 'public' ) );

/* A middleware that parses the body of the request and makes it available in the request object. */
app.use( express.json() );

app.use( router );

app.use( adminJs.options.rootPath, adminJsRouter );

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => 
{
   sequelize.authenticate().then( () => {
      console.log( "Connection has been established successfully." );
   } );
   
   console.log( `Server running on port ${PORT}` );
} );