import app from "./src/app.js";

const PORT = 8000;

const start= async()=>{
    try {
        await app.listen({
            port: PORT
        });

        console.log("Server is listening at PORT ",PORT);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();