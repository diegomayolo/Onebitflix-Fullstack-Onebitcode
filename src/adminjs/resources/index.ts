import { ResourceWithOptions } from 'adminjs';
import { categoryResourceOptions } from './category';
import { Category } from '../../models';

/* tem o propósito de reunir todas opções de todos os recursos criados */
export const adminJsResources: ResourceWithOptions[] = [
   {
      resource: Category,
      options: categoryResourceOptions
   }
]