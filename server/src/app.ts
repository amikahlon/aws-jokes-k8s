import express from "express";
import morgan from "morgan";
import axios from "axios";

import jokesRoutes from "./routes/jokesRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const allowedOrigin = process.env.CLIENT_ORIGIN || "*";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


app.get("/api/live", (req, res) => {
  res.status(200).send("OK");
});


app.get("/api/ready", async (req, res) => {

  const checks = {
    jokesApi: false
  };

  try {

    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
      { timeout: 2000 }
    );

    checks.jokesApi = response.status === 200;

  } catch {}

  const ready = Object.values(checks).every(Boolean);

  if (ready) {
    return res.status(200).json({
      status: "READY",
      checks
    });
  }

  res.status(503).json({
    status: "NOT_READY",
    checks
  });

});


app.get("/api/health", async (req, res) => {

  const start = Date.now();

  const health = {
    service: "jokes-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    externalApi: {
      status: "unknown",
      latencyMs: 0
    }
  };

  try {

    const apiStart = Date.now();

    await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
      { timeout: 2000 }
    );

    health.externalApi.status = "ok";
    health.externalApi.latencyMs = Date.now() - apiStart;

  } catch {

    health.externalApi.status = "down";

  }

  res.json(health);

});



// routes
app.use("/api/jokes", jokesRoutes);



app.use(errorMiddleware);

export default app;