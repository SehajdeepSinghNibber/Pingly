import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

export default async function messageRoutes(app) {
    app.get("/users",protectRoute,getUsersForSidebar);
    app.get(":id",protectRoute,getMessages)
    app.post("/send/:id",protectRoute,sendMessage)
}