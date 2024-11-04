import Elysia, { t } from "elysia";
import { CollageService } from "../services/collage";

// For now it makes sense to just have one controller.
// When the amount of endpoints grows, and the purpose of endpoints starts to differ more, create dedicated controllers (Auth, Crud, Healthcheck etc.)
export const Controller = new Elysia({ prefix: "/collage" })
  .post(
    "/",
    async ({ body }) => {
      const collageID = await CollageService.createCatCollage(body);
      return { id: collageID };
    },
    {
      body: t.Object({
        amount: t.Number({ minimum: 1, maximum: 6 }),
        breed: t.String({ minLength: 1, examples: ["siamese", "benghal"] }),
      }),
      response: {
        200: t.Object({
          id: t.Number(),
        }),
      },
    }
  )
  .get("/", async () => {
    return CollageService.listCollages();
  });
