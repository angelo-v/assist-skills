import {build} from "./app";

import * as dotenv from "dotenv";

dotenv.config();

const app = build({
    logger: {
        level: 'info'
    }
})

app.listen({port: 3000}, (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})