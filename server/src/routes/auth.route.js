import { login, signout, signup } from "../controllers/auth.controller.js"

export default async function authRoutes(app) {
    app.post("/signup",signup)

    app.post("/signout",signout)

    app.post("/login",login)

}