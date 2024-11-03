import { logger } from "@chneau/elysia-logger";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { Controller } from "./controllers";

// OK to cast to string, Elysia.listen will throw if port wasn't provided
const port = process.env.PORT as string;

// Don't add endpoints directly to this instance.
// Add them via a controller to create predictability about what to find where (http handlers in ./controllers in this example)
new Elysia().use(logger()).use(swagger()).use(Controller).listen(port);

console.info(`listening on port http://localhost:${port}`);
