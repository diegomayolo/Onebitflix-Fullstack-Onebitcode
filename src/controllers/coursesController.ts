import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { courseService } from "../services/courseService";

export const coursesController = {
   // GET /courses/featured -> get courses featured
   featured: async ( req: Request, res: Response ) => {
      try
      {
         const featuredCourses = await courseService.getRandomFeaturedCourses();

         return res.json( featuredCourses );
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },

   // GET /courses/newest -> get newest courses
   newest: async ( req: Request, res: Response ) => {
      try
      {
         const newestCourses = await courseService.getTopTenNewest();

         return res.json( newestCourses );
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },

   // GET /courses/search?name= -> get course by name
   search: async (req: Request, res: Response) => {
      const { name } = req.query
      const [page, perPage] = getPaginationParams( req.query )
  
      try
      {
         if ( typeof name !== 'string' ) throw new Error( 'Name param must be of type string' );

         const courses = await courseService.findByName( name, page, perPage )
         
         return res.json( courses )
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
    },

   // GET /courses/:id -> get a course by id with its episodes
   show: async ( req: Request, res: Response ) => {
      const { id } = req.params;

      try
      {
         const course = await courseService.findByIdWithEpisodes( id );

         return res.json( course );
      } 
      
      catch ( error )
      {
         if ( error instanceof Error )
         {
            return res.status( 400 ).json( { message: error.message } );
         }
      }
   },
};