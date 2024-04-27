import { createServer, Server } from "http";

import env from "./utils/env.util";
import { Mode, mode } from "./utils/node_env.util";
import app from "./app";

const server: Server = createServer(app);
const { NODE_PORT, NODE_HOSTNAME } = env;

server.listen(NODE_PORT, NODE_HOSTNAME, () => {
    if (mode() === Mode.Dev) {
        console.log(`Server listenning on http://${NODE_HOSTNAME}:${NODE_PORT}/`);
    } else if (mode() === Mode.Prod) {
        console.log(`Server listenning on hostname: ${NODE_HOSTNAME}, port: ${NODE_PORT}`);
    } else {
        console.log(`Server listenning`);
    }
});