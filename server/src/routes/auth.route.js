import { login, signout, signup, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

export default async function authRoutes(app) {
    app.post("/signup",signup)

    app.post("/signout",signout)

    app.post("/login",login)

    app.put("/update-profile", protectRoute, updateProfile)

}