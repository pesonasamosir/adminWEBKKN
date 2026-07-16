import api from "../lib/api";

export interface KategoriPayload {
  [key: string]: string[];
}

const kategoriService = {
  async getAll() {
    const { data } = await api.get("/kategori");
    return data.data as KategoriPayload;
  },
};

export default kategoriService;
