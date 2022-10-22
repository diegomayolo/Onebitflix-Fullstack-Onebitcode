import { Response } from "express";
import fs from "fs";
import path from "path";

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
}