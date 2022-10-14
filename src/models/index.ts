import { Category } from "./Category";
import { Course } from "./Course";

/* associação das tabelas */
Category.hasMany( Course );
Course.belongsTo( Category );

export {
   Category,
   Course
};