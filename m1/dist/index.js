import express from "express";
import cors from "cors";
import * as routes from "./routes/index.js";
import { logger } from "./utils/index.js";
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(routes.productRouter);
app.listen(process.env['PORT'] || 5555, () => {
    logger.connectSuccess(`Listening port ${process.env['PORT'] || 5555}`);
});
export { app };
