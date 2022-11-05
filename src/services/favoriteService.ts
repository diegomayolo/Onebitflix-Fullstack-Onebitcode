import { Favorite } from "../models";

export const favoriteService = {
   /* This is a function that is returning a promise. */
   findByUserId: async ( userId: number ) => {
      const favorites = await Favorite.findAll({
         attributes: [['user_id', 'userId']],
         where: { userId },
         include: {
            association: 'course',
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
         }
      });

      return {
         userId, courses: favorites.map( favorite => favorite.course )
      };
   },

   /* Creating a new favorite. */
   create: async ( userId: number, courseId: number ) => {
      const favorite = Favorite.create({
         userId,
         courseId
      })

      return favorite;
   },

   /* Deleting the favorite from the database. */
   delete: async ( userId: number, courseId: number ) => {
      await Favorite.destroy({
         where: { 
            userId, 
            courseId 
         }
      });
   },

  /* Checking if the user has favorited the course. */
   isFavorited: async ( userId: number, courseId: number ) => {
      const favorite = await Favorite.findOne({
         where: { 
            userId, 
            courseId 
         }
      });

      return favorite !== null;
   },
};