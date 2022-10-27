import { Like } from "../models"

export const LikeService = {
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
   }
}