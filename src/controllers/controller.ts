import Elysia, { t } from "elysia";

// For now it makes sense to just have one controller.
// When the amount of endpoints grows, and the purpose of endpoints starts to differ more, create dedicated controllers (Auth, Crud, Healthcheck etc.)
export const Controller = new Elysia().post(
  "/collage",
  (context) => {
    console.log(context.body);
    return context.body;
  },
  {
    body: t.Object({
      amount: t.Number({ minimum: 1, maximum: 6 }),
      breed: t.String({ minLength: 1, examples: "siamese" }),
    }),
  }
);
