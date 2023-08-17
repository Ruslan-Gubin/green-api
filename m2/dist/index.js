import express from "express";
import cors from "cors";
import { logger } from "./utils/index.js";
import { RabbitAmqpService } from "./services/rabbitmq-service.js";
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
const rabbitAmqpService = new RabbitAmqpService();
rabbitAmqpService.startConsumer();
app.listen(process.env['PORT'] || 5000, () => {
    logger.connectSuccess(`Listening port ${process.env['PORT'] || 5000}`);
});
export { app };
