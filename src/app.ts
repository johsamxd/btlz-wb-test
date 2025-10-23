import knex, { migrate, seed } from "#postgres/knex.js";
import { cronService } from "#services/cron/cronService.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

try {
    cronService.start();
    console.log("Cron started!");
} catch (err) {
    console.log("Cron error: ", err);
}
