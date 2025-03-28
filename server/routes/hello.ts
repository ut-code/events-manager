import { Hono } from "hono";

let count = 0;

const SpecialHellos = new Map([
  [1, "first"],
  [2, "second"],
  [3, "third"],
]);

const route = new Hono()
  .get("/", async (c) => {
    return c.json({
      message: `You've hello'ed ${count} time(s)`,
      count,
    });
  })
  .post("/", async (c) => {
    count++;
    return c.json({
      message: `That's your ${SpecialHellos.get(count) ?? `${count}th`} hello`,
      count,
    });
  })
  .delete("/", async (c) => {
    const preCount = count;
    count = 0;
    return c.json({
      message: `You've reset count! it was ${preCount} before.`,
      count,
    });
  });

export default route;
