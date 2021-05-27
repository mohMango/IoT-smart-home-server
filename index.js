import express from "express";
import cors from "cors";

import deviceRoutes from "./src/routes/device.routes.js";

const app = express();
const port = process.env.PORT || 5000;

// Cross-Origin Resource Sharing (CORS) is a security protocol in modern browsers
app.use(cors());
// parse requests of content-type: application/json
app.use(express.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(deviceRoutes);

app.get("/", (req, res) => {
  res.send({ value: "Hello from server" });
});

app.listen(port, () => {
  console.log(`server run on port: ${port}`);
});
