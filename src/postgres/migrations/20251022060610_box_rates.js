/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("box_rates", (table) => {
        table.increments("id").primary();
        table.decimal("boxDeliveryBase", 10, 2);
        table.text("boxDeliveryCoefExpr");
        table.decimal("boxStorageBase", 10, 2);
        table.text("boxStorageCoefExpr");
        table.decimal("boxPickupBase", 10, 2);
        table.text("boxPickupCoefExpr");
        table.date("dtNextBox");
        table.date("dtTillMax");
        table.text("boxDeliveryAndStorageExpr");
        table.text("boxStorageExpr");
        table.text("boxDeliveryBaseExpr");
        table.text("boxDeliveryLiterExpr");
        table.text("boxPickupExpr");
        table.string("geoName");
        table.string("warehouseName");
        table.date("date").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("box_rates");
}
