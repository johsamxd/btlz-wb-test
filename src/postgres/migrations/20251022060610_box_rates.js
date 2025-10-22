/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("box_rates", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("box_delivery_base");
        table.string("box_delivery_coef_expr");
        table.string("box_delivery_liter");
        table.string("box_delivery_marketplace_base");
        table.string("box_delivery_marketplace_coef_expr");
        table.string("box_delivery_marketplace_liter");
        table.string("box_storage_base");
        table.string("box_storage_coef_expr");
        table.string("box_storage_liter");
        table.string("geo_name");
        table.string("warehouse_name");
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
