import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
   /* This is a function that is returning a course with episodes. */
   findByIdWithEpisodes: async ( id: string ) => {
      const courseWithEpisodes = await Course.findByPk( id, {
         attributes: [ 'id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl'] ],
         include: {
            association: 'episodes',
            attributes: [ 'id', 'name', 'synopsis', 'order', ['video_url', 'videoUrl'], [ 'seconds_long', 'secondsLong' ] ],
            order: [ ['order', 'ASC'] ],
            separate: true,
         },
      } );

      return courseWithEpisodes;
   },

   /* Getting the featured courses and then sorting them randomly and then returning the first 3. */
   getRandomFeaturedCourses: async () => {
      const featuredCourses = await Course.findAll( {
        attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
        where: {
          featured: true
        }
      })
  
      const randomFeaturedCourses = featuredCourses.sort( () => 0.5 - Math.random() ).slice( 0, 3 );
  
      return randomFeaturedCourses;
    },

   /* This is a function that is returning the top 10 newest courses. */
   getTopTenNewest: async () => {
      const courses = await Course.findAll( {
         attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
         order: [['created_at', 'DESC']],
         limit: 10,
      } );
   
      return courses;
   },

   /* This is a function that is returning the top 10 courses that have the most likes. */
   getTopTenByLikes: async () => {
      const results = await Course.sequelize?.query(
         `SELECT
           courses.id,
           courses.name,
           courses.synopsis,
           courses.thumbnail_url as thumbnailUrl,
           COUNT(users.id) AS likes
         FROM courses
           LEFT OUTER JOIN likes
             ON courses.id = likes.course_id
             INNER JOIN users
               ON users.id = likes.user_id
         GROUP BY courses.id
         ORDER BY likes DESC
         LIMIT 10;`
       )

      if ( results )
      {
         const [ topTen ] = results;

         return topTen;
      }

      else
      {
         return null
      }
   },

   /* This is a function that is returning the courses that are matching the name that is passed in. */
   findByName: async ( name: string, page: number, perPage: number ) => {
      const offset = ( page - 1 ) * perPage
  
      const { count, rows } = await Course.findAndCountAll( {
        attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        limit: perPage,
        offset
      } )
  
      return {
        courses: rows,
        page,
        perPage,
        total: count
      }
    },
};