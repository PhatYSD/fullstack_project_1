import { createServer, Server } from "http";

import env from "./utils/env.util";
import app from "./app";

const server: Server = createServer(app);
const { NODE_PORT, NODE_HOSTNAME } = env;

server.listen(NODE_PORT, NODE_HOSTNAME, () => {
    console.log(`Server listenning on http://${NODE_HOSTNAME}:${NODE_PORT}/`);
});