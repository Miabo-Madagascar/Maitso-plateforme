import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/UsersDBConnection";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Starting server...");
    console.log(`Server listening on port ${port}`);
    console.log(`Swagger UI docs at http://localhost:${port}/api-docs`);
  });
});