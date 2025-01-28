import {build} from "./app";

import * as dotenv from "dotenv";

dotenv.config();

const app = build({
    logger: {
        level: 'info'
    }
})

app.listen({port: 3000, host: "0.0.0.0"}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})

process.on('SIGTERM', async () => {
    app.log.info("Terminating server due to SIGTERM");
    await app.close()
})

process.on('SIGINT', async () => {
    app.log.info("Terminating server due to SIGINT");
    await app.close()
})