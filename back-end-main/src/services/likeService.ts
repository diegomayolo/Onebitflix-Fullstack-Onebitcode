import { Like } from "../models"

export const likeService = {
   /* Creating a new like in the database. */
   create: async ( userId: number, courseId: number ) => {
      const like = await Like.create({
         userId,
         courseId
      })

      return like;
   },

   /* Deleting the like from the database. */
   delete: async ( userId: number, courseId: number ) => {
      await Like.destroy({
         where: {
            userId,
            courseId
         }
      })
   },

   /* Checking if the user has liked the course. */
   isLiked: async (userId: number, courseId: number) => {
      const like = await Like.findOne({
        where: {
          userId,
          courseId
        }
      })

      return like !== null;
   }
}