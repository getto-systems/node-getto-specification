const specification = require("../index");

test("init spec", async () => {
  const spec = specification.init();

  const condition = spec.init(() => true);

  await expect(condition.matches()).resolves.toBe(true);
});

test("not", async () => {
  const spec = specification.init();

  const condition = spec.init(() => true);

  await expect(spec.not(condition).matches()).resolves.toBe(false);
});

test("all satisfied", async () => {
  const spec = specification.init();

  const conditionA = spec.init(() => true);
  const conditionB = spec.init(() => true);

  await expect(spec.all([
    conditionA,
    conditionB,
  ]).matches()).resolves.toBe(true);
});

test("some not satisfied", async () => {
  const spec = specification.init();

  const conditionA = spec.init(() => false);
  const conditionB = spec.init(() => true);

  await expect(spec.all([
    conditionA,
    conditionB,
  ]).matches()).resolves.toBe(false);
});

test("caching result", async () => {
  const spec = specification.init();

  const condition = spec.init(() => true);

  await expect(spec.all([
    condition,
    spec.not(condition),
  ]).matches()).resolves.toBe(false);
});
