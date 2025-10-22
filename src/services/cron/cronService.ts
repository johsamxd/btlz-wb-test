import * as cron from "node-cron";
import { tariffsClient } from "#services/wb/tariffsClient.js";
import knex from "#postgres/knex.js";
import { BoxRate } from "#models/BoxRate.js";

export class CronService {
    private tariffsClient = tariffsClient;

    start() {
        cron.schedule("1 * * * * *", async () => {
            try {
                const data = await this.tariffsClient.fetchData();
                const rates: BoxRate[] = data?.response?.data?.warehouseList;

                for (const rate of rates) {
                    const date = new Date(new Date().toISOString().split("T")[0]);
                    await knex("box_rates")
                        .insert({
                            date: date,
                            box_delivery_base: rate.boxDeliveryBase,
                            box_delivery_coef_expr: rate.boxDeliveryCoefExpr,
                            box_delivery_liter: rate.boxDeliveryLiter,
                            box_delivery_marketplace_base: rate.boxDeliveryMarketplaceBase,
                            box_delivery_marketplace_coef_expr: rate.boxDeliveryMarketplaceCoefExpr,
                            box_delivery_marketplace_liter: rate.boxDeliveryMarketplaceLiter,
                            box_storage_base: rate.boxStorageBase,
                            box_storage_coef_expr: rate.boxStorageCoefExpr,
                            box_storage_liter: rate.boxStorageLiter,
                            geo_name: rate.geoName,
                            warehouse_name: rate.warehouseName,
                            updated_at: knex.fn.now(),
                        })
                        .onConflict(["date", "warehouse_name"])
                        .merge();
                }

                console.log(`Updated ${rates.length} box rates in DB`);
            } catch (error) {
                console.error("Cron task failed", error);
            }
        });
    }
}
