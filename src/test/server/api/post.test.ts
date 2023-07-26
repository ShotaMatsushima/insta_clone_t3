import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";
import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test("create post", async () => {
  const ctx = await createInnerTRPCContext({
    session: {
      user: {
        id: "id12345",
        name: "testUser",
        email: "test@test.com",
      },
      expires: "1234567",
    },
  });
  const caller = appRouter.createCaller(ctx);

  const input: inferProcedureInput<AppRouter["post"]["create"]> = {
    title: "First Post",
    content: "Add new test content",
  };

  const post = await caller.post.create(input);
  expect(post.title).toEqual("First Post");
  expect(post.content).toEqual("Add new test content");
});
