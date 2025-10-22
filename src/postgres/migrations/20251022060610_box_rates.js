/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("box_rates", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("boxDeliveryBase");
        table.string("boxDeliveryCoefExpr");
        table.string("boxDeliveryLiter");
        table.string("boxDeliveryMarketplaceBase");
        table.string("boxDeliveryMarketplaceCoefExpr");
        table.string("boxDeliveryMarketplaceLiter");
        table.string("boxStorageBase");
        table.string("boxStorageCoefExpr");
        table.string("boxStorageLiter");
        table.string("geoName");
        table.string("warehouseName");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        table.unique(["date", "warehouse_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("box_rates");
}
