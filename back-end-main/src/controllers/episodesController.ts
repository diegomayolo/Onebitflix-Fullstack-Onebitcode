import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { episodeService } from "../services/episodeService";

export const episodesController = {
   // GET /episodes/stream?videoUrl= -> get episode stream
   /* The above code is a function that is responsible for streaming a video file to the client. */
   stream: async ( req: Request, res: Response ) => {
      const { videoUrl } = req.query;

      try
      {
         if ( typeof videoUrl !== 'string' ) throw new Error( 'VideoUrl param must be of type string' );
         
         const range = req.headers.range; // bytes=0-1024

         episodeService.streamEpisodeToResponse( res, videoUrl, range );
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },

   // GET /episodes/:id/watchTime -> get watch time for episode
   getWatchTime: async ( req: AuthenticatedRequest, res: Response ) => {
      const userId    = req.user!.id;
      const episodeId = req.params.id;

      try
      {
         const watchTime = await episodeService.getWatchTime( userId, Number( episodeId ) );

         return res.json( watchTime );
      }
         
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },

   // POST /episodes/:id/watchTime -> get watch time for episode
   setWatchTime: async ( req: AuthenticatedRequest, res: Response ) => {
      const userId      = req.user!.id;
      const episodeId   = Number( req.params.id );
      const { seconds } = req.body;

      try
      {
         const watchTime = await episodeService.setWatchTime( { userId, episodeId, seconds } );

         return res.json( watchTime );
      }
         
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   }
}