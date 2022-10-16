import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

/* Creating a relationship between the two tables. */
Category.hasMany( Course );

Course.belongsTo( Category );
Course.hasMany( Episode ); 

Episode.belongsTo( Course );

export {
   Category,
   Course,
   Episode,
   User
};