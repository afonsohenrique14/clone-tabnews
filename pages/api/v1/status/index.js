import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const resultVersion = await database.query("SHOW server_version;");
  const databaseVersion = resultVersion.rows[0].server_version;

  const databaseMaxConectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConectionsValue =
    databaseMaxConectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseOpenedConectionsValue =
    databaseOpenedConectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConectionsValue),
        opened_connections: databaseOpenedConectionsValue,
      },
    },
  });
}

export default status;