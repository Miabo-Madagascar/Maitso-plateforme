import express, { Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger";

import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log("Starting server...");
  console.log(`Server listening on port ${port}`);
  console.log(`Swagger UI docs at http://localhost:${port}/api-docs`);
});

/**
 * @openapi
 * /hello:
 *   get:
 *     summary: Say Hello
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get('/hello', (_req, res) => {
  res.send('Hello!');
});
