import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

export default async function messageRoutes(app) {
  app.get("/users", {
    preHandler: protectRoute,
    handler: getUsersForSidebar,
  });

  app.get("/:id", {
    preHandler: protectRoute,
    handler: getMessages,
  });

  app.post("/send/:id", {
    preHandler: protectRoute,
    handler: sendMessage,
  });
}