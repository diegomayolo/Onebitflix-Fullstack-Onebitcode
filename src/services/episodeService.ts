import { Response } from "express";
import fs from "fs";
import path from "path";
import { WatchTimeAttributes } from "../models/WatchTime";
import { WatchTime } from "../models";

export const episodeService = {
   streamEpisodeToResponse: ( res: Response, videoUrl: string, range: string | undefined ) => {
      const filePath = path.join( __dirname, '..', '..', 'uploads', videoUrl );
      const fileStat = fs.statSync( filePath );

      if ( range )
      {
         // Get the start and end positions from the range header
         const parts = range.replace( /bytes=/, '' ).split( "-" );
         const start = parseInt( parts[0], 10 );
         const end = parts[1] ? parseInt( parts[1], 10 ) : fileStat.size - 1;
         
         // Calculate the chunk size
         const chunkSize = ( end - start ) + 1;
         
         // Create a stream of the file
         const file = fs.createReadStream( filePath, { start, end } );
         
         /* Setting the response header. */
         const head = {
            'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
         };
         
         /* Sending a response header to the client. */
         res.writeHead( 206, head );

         /* Piping the file to the response. */
         file.pipe( res );
      }

      else
      {
         /* This is the code that is responsible for sending the video file to the client. */
         const head = {
            'Content-Length': fileStat.size,
            'Content-Type': 'video/mp4',
         };

         res.writeHead( 200, head );

         fs.createReadStream( filePath ).pipe( res );
      }
   },

   /* This is a function that is used to get the watch time of a user for a particular episode. */
   getWatchTime: async ( userId: number, episodeId: number ) => {
      const watchTime = await WatchTime.findOne( {
         attributes: [ 'seconds' ],
         where: {
            episodeId,
            userId
         }
      } );

      return watchTime;
   },

   /* This is a function that is used to set the watch time of a user for a particular episode. */
   setWatchTime: async ( { userId, episodeId, seconds }: WatchTimeAttributes ) => {
      const watchTimeAlreadyExists = await WatchTime.findOne( {
         where: {
            userId,
            episodeId
         }
      } );

      if ( watchTimeAlreadyExists )
      {
         watchTimeAlreadyExists.seconds = seconds;

         await watchTimeAlreadyExists.save();

         return watchTimeAlreadyExists;
      }

      else
      {
         const watchTime = await WatchTime.create( {
            userId,
            episodeId,
            seconds
         } );
   
         return watchTime;
      }
   }
}