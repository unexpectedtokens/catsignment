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
  })
  .get(
    "/:collageid",
    async ({ params: { collageid } }) => {
      return CollageService.getCollage(collageid);
    },
    {
      params: t.Object({
        collageid: t.Number({ minimum: 1 }),
      }),
    }
  )
  .get(
    "/:collageid/photos",
    async ({ params: { collageid } }) => {
      return CollageService.getCollagePhotos(collageid);
    },
    {
      params: t.Object({
        collageid: t.Number({ minimum: 1 }),
      }),
    }
  )
  .put(
    "/:collageid",
    async ({ body: { name, description }, params: { collageid } }) => {
      await CollageService.updateCollage(collageid, name, description);
    },
    {
      params: t.Object({
        collageid: t.Number({ minimum: 1 }),
      }),
      body: t.Object({
        name: t.String({ minLength: 2, maxLength: 20 }),
        description: t.String({ minLength: 2, maxLength: 200 }),
      }),
    }
  );
