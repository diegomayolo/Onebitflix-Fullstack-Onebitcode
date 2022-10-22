import { Request, Response } from "express";
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
}