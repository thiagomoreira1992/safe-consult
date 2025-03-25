import { Application } from "express";
import homeRoutes from "./home.routes";
import postsRoutes from "./posts.routes";

export default class Routes{
    constructor(app: Application){
        app.use("/api", homeRoutes)
        app.use("/api/posts", postsRoutes)
    }
}