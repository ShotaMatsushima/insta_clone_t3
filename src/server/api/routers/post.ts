import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  post: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.create({
      data: {
        title: "Hello World",
        content: "This is my first post",
      },
    });
  }),
});
