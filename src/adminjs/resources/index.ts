import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Category, Course, Episode } from '../../models';
import { courseResourceOptions } from './course';
import { episodeResourceOptions } from './episode';

/* tem o propósito de reunir todas opções de todos os recursos criados */
export const adminJsResources: ResourceWithOptions[] = [
   {
      resource: Category,
      options: categoryResourceOptions
   },
   {
      resource: Course,
      options: courseResourceOptions
   },
   {
      resource: Episode,
      options: episodeResourceOptions
   },
]