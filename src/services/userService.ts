import { User } from "../models"
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

/**
 * It takes an array of episodes and returns an array of episodes, where each course has only one
 * episode, and that episode is the one with the highest order
 * @param {EpisodeInstance[]} episodes - EpisodeInstance[]
 * @returns An array of EpisodeInstance objects.
 */
function filterLastEpisodesByCourse( episodes: EpisodeInstance[] )
{
   const coursesOnList: number[] = [];

   const lastEpisodes = episodes.reduce( ( currentList, episode ) => {
      if ( !coursesOnList.includes( episode.courseId ) )
      {
         coursesOnList.push( episode.courseId );
         currentList.push( episode );
         return currentList;
      }

      const episodeFromSameCourse = currentList.find( ep => ep.courseId === episode.courseId );

      if ( episodeFromSameCourse!.order > episode.order ) return currentList;

      const listWithoutEpisodeFromSameCourse = currentList.filter( ep => ep.courseId !== episode.courseId );
      listWithoutEpisodeFromSameCourse.push( episode );

      return listWithoutEpisodeFromSameCourse;
   }, [] as EpisodeInstance[] );

   return lastEpisodes;
}

export const userService = {
   /* find a user through their email. */
   findByEmail: async ( email: string ) => {
      const user = await User.findOne( { 
         where: { email },
       } );

       return user;
   }, 

   /* Creating a new user. */
   create: async ( attributes: UserCreationAttributes ) => {
      const user = await User.create( attributes )
      return user
   },

   /* Returns the most recent episode of a course that has some assisted progress */
   getKeepWatchingList: async ( userId: number ) => {
      const userWithWatchingEpisodes = await User.findByPk( userId, {
         include: {
            association: 'Episodes',
            attributes: ['id', 'name', 'synopsis', 'order', [ 'video_url', 'videoUrl' ], ['seconds_long', 'secondsLong' ], [ 'course_id', 'courseId' ] ],
            include: [ {
               association: 'course',
               attributes: [ 'id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl'] ],
            } ],
            through: {
               as: 'watchTime',
               attributes: [ 'seconds', [ 'updated_at', 'updatedAt' ] ],
            }
         }
      } );

      if ( !userWithWatchingEpisodes ) throw new Error( 'User not found.' );

      const keepWatchingList = filterLastEpisodesByCourse( userWithWatchingEpisodes.Episodes! );
      
      /* Sorting the array of episodes by the date they were last watched. */
      // @ts-ignore
      keepWatchingList.sort( ( a, b ) => a.watchTime!.updatedAt < b.watchTime!.updatedAt ? 1 : -1 );

      return keepWatchingList;
   },
}