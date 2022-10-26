import { Favorite } from "../models";

export const favoriteService = {
   create: async ( userId: number, courseId: number ) => {
      const favorite = Favorite.create({
         userId,
         courseId
      })

      return favorite;
   },
};