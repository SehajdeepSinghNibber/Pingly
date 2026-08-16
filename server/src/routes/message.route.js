import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";

export default async function messageRoutes(app) {
    app.get("/users",protectRoute,getUsersForSidebar)
}