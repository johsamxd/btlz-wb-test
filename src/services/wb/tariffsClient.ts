import axios, { AxiosInstance } from "axios";
import { api } from "./api.js";

class TariffsClient {
    private apiInstance: AxiosInstance = api;

    async fetchData() {
        try {
            const { data } = await this.apiInstance.get("/api/v1/tariffs/box");
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
