import { Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export const authController = {
   // POST /auth/register - Register a new user
   register: async ( req: Request, res: Response ) => {
      const { firstName, lastName, email, password, birth, phone } = req.body;
   
      try 
      {
         const userAlreadyExists = await userService.findByEmail( email );
         
         if ( userAlreadyExists ) 
         {
            throw new Error( 'User email already exists' );
         }

         const user = await userService.create( {
            firstName,
            lastName,
            email,
            password,
            birth,
            phone,
            role: "user"
         } );

         return res.status( 201 ).json( user );
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },

   // POST /auth/login - Login a user
   login: async ( req: Request, res: Response ) => {
      const { email, password } = req.body;

      try 
      {
         const user = await userService.findByEmail( email );

         if ( !user ) 
         {
            return res.status( 404 ).json( { message: 'User not found' } );
         }

         user.checkPassword( password, ( error, isSame ) => {
            if ( error )
            {
               return res.status( 400 ).json( { message: error.message } );
            }

            if ( !isSame )
            {
               return res.status( 401 ).json( { message: 'Invalid password' } );
            }

           /* This is the code that generates the token. */
            const payload = {
               id: user.id,
               firstName: user.firstName,
               email: user.email,
            }

            const token = jwtService.signToken( payload, '7d' );

            return res.status( 200 ).json( { authenticate: true, ...payload, token } );
         } );
      } 
      
      catch ( error ) 
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },
}