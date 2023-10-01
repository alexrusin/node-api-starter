import EnvManager from "./config/EnvManager";
import { createServer } from "./server";
import logger from "./utils/Logger";

const port = EnvManager.getPort() || 3001;
const server = createServer();

server.listen(port, () => {
  logger.debug`api running on ${port}`;
});
