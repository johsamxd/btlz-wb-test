import axios from "axios";
import { api } from "./api.js";

class TariffsClient {
    async fetchData(date?: string) {
        const queryDate = date || new Date().toISOString().split("T")[0];

        try {
            const { data } = await api.get("/api/v1/tariffs/box", {
                params: { date: queryDate },
            });
            return data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || "Unknown API error";
                throw new Error(message);
            } else {
                throw new Error("Network or unexpected error occurred");
            }
        }
    }
}

export const tariffsClient = new TariffsClient();
