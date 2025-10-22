import knex, { migrate, seed } from "#postgres/knex.js";
import { CronService } from "#services/cron/cronService.js";
import { tariffsClient } from "#services/wb/tariffsClient.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

// const data = await tariffsClient.fetchData();
// console.log(data);

const cron = new CronService();
try {
    cron.start();
    console.log("Cron started!");
} catch (err) {
    console.log("Cron error: ", err);
}
