import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { google } from "googleapis";

class GoogleSheetsService {
    private sheets = google.sheets({ version: "v4", auth: this.getAuth() });
    private sheetIds: string[] = env.SPREADSHEET_IDS;

    private getAuth() {
        return new google.auth.GoogleAuth({
            keyFilename: env.GOOGLE_KEY_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
    }

    async exportToSheets() {
        try {
            const data = await knex("box_rates").select("*").orderBy("box_delivery_coef_expr", "asc");
            const headers = Object.keys(data[0]);
            const values = [headers, ...data.map((row) => headers.map((key) => row[key]))];

            for (const sheetId of this.sheetIds) {
                const spreadsheet = await this.sheets.spreadsheets.get({ spreadsheetId: sheetId });
                const sheetExists = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === "stocks_coefs");

                if (!sheetExists) {
                    await this.sheets.spreadsheets.batchUpdate({
                        spreadsheetId: sheetId,
                        requestBody: {
                            requests: [
                                {
                                    addSheet: {
                                        properties: {
                                            title: "stocks_coefs",
                                        },
                                    },
                                },
                            ],
                        },
                    });
                    console.log(`Created new sheet "stocks_coefs" in ${sheetId}`);
                }

                await this.sheets.spreadsheets.values.clear({
                    spreadsheetId: sheetId,
                    range: "stocks_coefs!A:Z",
                });

                await this.sheets.spreadsheets.values.update({
                    spreadsheetId: sheetId,
                    range: "stocks_coefs!A1",
                    valueInputOption: "RAW",
                    requestBody: { values },
                });

                console.log(`Exported data to Google Sheet ${sheetId}`);
            }
        } catch (error) {
            console.error("Google Sheets export failed", error);
        }
    }
}

export const googleSheetsService = new GoogleSheetsService();
