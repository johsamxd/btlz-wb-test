import env from "#config/env/env.js";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    const ids = env.SPREADSHEET_IDS;
    if (ids.length === 0) {
        console.log("No spreadsheet IDs to seed");
        return;
    }

    const data = ids.map((id) => ({ spreadsheet_id: id }));
    await knex("spreadsheets").insert(data).onConflict(["spreadsheet_id"]).ignore();

    console.log(`Seeded ${ids.length} spreadsheet IDs`);
}
