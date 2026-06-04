import database from "infra/database";
beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("DELETE to /api/v1/migrations should hold 0 connections", async() =>{
  
  const response = await fetch("http://localhost:3000/api/v1/migrations",{
    method: "DELETE"
  })

  expect(response.status).toBe(405)

  const response_stautus = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response_stautus.json();

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

})

