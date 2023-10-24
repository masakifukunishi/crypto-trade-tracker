import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

import apiRoutes from "./api-routes/index.js";
import firebaseAuthMiddleware from "./middleware/firebaseAuth.js";
import db from "./helpers/mongodb.js";

const app: Express = express();
const port: number = Number(process.env.PORT) || 8080;

// Set timezone to UTC
process.env.TZ = "UTC";

// connect to MongoDB
// await db.connect();

app.use(express.static("../client/dist"));

app.use(express.json());

app.use(firebaseAuthMiddleware);
app.use("/api", apiRoutes);

app.get("*", (_req: Request, res: Response) => {
  const pathIndex: string = path.resolve("../client/dist", "index.html");
  res.status(404).sendFile(pathIndex);
});

// This function is marked as having an unused 'err' parameter, but it's necessary
// as an Express error-handling middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
