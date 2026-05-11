import database from "infra/database";
beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should retur 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  database.query("SELECT 1+1;");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(process.env.POSTGRES_HOST).toBeDefined();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});