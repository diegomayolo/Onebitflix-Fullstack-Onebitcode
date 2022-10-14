import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Category, Course } from '../../models';
import { courseResourceOptions } from './course';

/* tem o propósito de reunir todas opções de todos os recursos criados */
export const adminJsResources: ResourceWithOptions[] = [
   {
      resource: Category,
      options: categoryResourceOptions
   },
   {
      resource: Course,
      options: courseResourceOptions
   }
]