import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import AdminJS from "adminjs";
import { sequelize } from "../database";
import { authenticationOptions } from "./authentication";
import { brandingOptions } from "./branding";
import { dashboartOptions } from "./dashboard";
import { locale } from "./locale";
import { adminJsResources } from "./resources";

AdminJS.registerAdapter( AdminJSSequelize );

export const adminJs = new AdminJS
( {
   databases: [sequelize],
   rootPath: "/admin",
   resources: adminJsResources,
   branding: brandingOptions,
   locale: locale,
   dashboard: dashboartOptions
} );

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter
(
   adminJs,
   authenticationOptions,
   null, 
   {
      resave: false,
      saveUninitialized: true,
   }
);