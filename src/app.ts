import knex, { migrate, seed } from "#postgres/knex.js";
import { tariffsClient } from "#services/wb/tariffsService.js";

await migrate.latest();
await seed.run();
const data = await tariffsClient.fetchData();
console.log(data);

console.log("All migrations and seeds have been run");
