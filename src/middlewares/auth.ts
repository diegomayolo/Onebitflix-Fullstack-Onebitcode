import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
   user?: UserInstance | null;
}

/**
 * It checks if the request has an authorization header, if it doesn't it returns a 401 response. If it
 * does, it extracts the token from the header, verifies it, and if it's valid, it sets the user
 * property on the request object and calls the next function
 * @param {AuthenticatedRequest} req - AuthenticatedRequest - This is the request object that is passed
 * to the route handler. It is an extension of the Express Request object.
 * @param {Response} res - Response - The response object
 * @param {NextFunction} next - The next function to be called after the middleware.
 * @returns The user object.
 */
export function ensureAuth( req: AuthenticatedRequest, res: Response, next: NextFunction ) {
   const authorizationHeader = req.headers.authorization;

   if ( !authorizationHeader ) 
   {
      return res.status( 401 ).json( { message: 'Not authorized. Token not found' } );
   }

   // Bearer <token>
   const token = authorizationHeader.replace( /Bearer /, '' );

   jwtService.verifyToken( token, async ( error, decoded ) => {
      if ( error || typeof decoded === 'undefined' ) 
      {
         return res.status( 401 ).json( { message: 'Not authorized. Invalid token' } );
      }

      const user = await userService.findByEmail( ( decoded as JwtPayload ).email );
      
      req.user = user;
      
      next();
   } );
}

/**
 * It takes a request, response, and next function as parameters. It then checks if the request has a
 * token in the query string. If it does, it verifies the token and then sets the user property on the request object
 * @param {AuthenticatedRequest} req - AuthenticatedRequest - this is a custom type that extends the Request type from express.
 * @param {Response} res - Response - the response object
 * @param {NextFunction} next - A function to be called when the middleware is done.
 */
export function ensureAuthViaQuery( req: AuthenticatedRequest, res: Response, next: NextFunction ) {
   const { token } = req.query;

   if ( !token ) 
   {
      return res.status( 401 ).json( { message: 'Not authorized. Token not found' } );
   }

   if ( typeof token !== 'string' )
   {
      return res.status( 401 ).json( { message: 'Parameter token must be string' } );
   }

   jwtService.verifyToken( token, async ( error, decoded ) => {
      if ( error || typeof decoded === 'undefined' ) 
      {
         return res.status( 401 ).json( { message: 'Not authorized. Invalid token' } );
      }

      const user = await userService.findByEmail( ( decoded as JwtPayload ).email );

      req.user = user;

      next();
   } );
}