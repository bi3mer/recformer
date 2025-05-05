import { expect, test } from "bun:test";
import { horizontalEnemies } from "./computationalMetrics";

test("countHorizontalEnemies", () => {
  expect(horizontalEnemies(["----", "---H"])).toBe(1);
  expect(horizontalEnemies(["----", "----"])).toBe(0);
  expect(horizontalEnemies(["-H--", "-H--"])).toBe(2);
  expect(horizontalEnemies(["H-H-", "---H"])).toBe(3);
  expect(horizontalEnemies(["HHHv", "---H"])).toBe(4);
});
