import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Category, Course, Episode, User } from '../../models';
import { courseResourceFeatures, courseResourceOptions } from './course';
import { episodeResourceFeatures, episodeResourceOptions } from './episode';
import { userResourceOptions } from './user';

/* tem o propósito de reunir todas opções de todos os recursos criados */
export const adminJsResources: ResourceWithOptions[] = [
   {
      resource: Category,
      options: categoryResourceOptions
   },
   {
      resource: Course,
      options: courseResourceOptions,
      features: courseResourceFeatures
   },
   {
      resource: Episode,
      options: episodeResourceOptions,
      features: episodeResourceFeatures
   },
   {
      resource: User,
      options: userResourceOptions,
   },
]