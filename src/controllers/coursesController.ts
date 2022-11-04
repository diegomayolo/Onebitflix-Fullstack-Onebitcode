import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { courseService } from "../services/courseService";
import { favoriteService } from "../services/favoriteService";
import { likeService } from "../services/likeService";

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
   show: async ( req: AuthenticatedRequest, res: Response ) => {
      const userId = req.user!.id;
      const courseId = req.params.id;

      try
      {
         const course = await courseService.findByIdWithEpisodes( courseId );

         if ( !course ) return res.status( 404 ).json( { message: 'Course not found' } );

         const liked     = await likeService.isLiked( userId, Number( courseId ) );
         const favorited = await favoriteService.isFavorited( userId, Number( courseId ) );


         return res.json( { ...course.get(), favorited, liked } )
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