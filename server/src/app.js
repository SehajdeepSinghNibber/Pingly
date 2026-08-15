import Fastify from "fastify";
import helmet from "@fastify/helmet"
import authRoutes from "./routes/auth.route.js";

const app = Fastify({
    logger: true
});

await app.register(helmet);

app.get("/",(request,reply)=>{
    return "Hello"
})

app.register(authRoutes,{
    prefix: "/api/v1/auth"
})

export default app;