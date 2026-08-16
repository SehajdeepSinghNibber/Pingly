import Fastify from "fastify";
import helmet from "@fastify/helmet"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";

const app = Fastify({
    logger: true
});

await app.register(helmet);
await app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});
await app.register(cookie);

app.get("/",(request,reply)=>{
    return "Hello"
})

app.register(authRoutes,{
    prefix: "/api/v1/auth"
})

app.register(messageRoutes,{
    prefix: "/api/v1/msg"
})

export default app;