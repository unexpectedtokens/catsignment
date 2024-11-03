import { logger } from "@chneau/elysia-logger";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

// OK to cast to string, Elysia.listen will throw if port wasn't provided
const port = process.env.PORT as string;

new Elysia()
  .use(logger())
  .use(swagger())
  .post(
    "/collage",
    (context) => {
      console.log(context.body);
      return context.body;
    },
    {
      body: t.Object({
        amount: t.Number({ minimum: 1, maximum: 6 }),
        breed: t.String({ minLength: 1 }),
      }),
    }
  )
  .listen(port);

console.info(`listening on port http://localhost:${port}`);
