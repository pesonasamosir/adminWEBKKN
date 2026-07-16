import api from "../lib/api";

export interface PupukPayload {
  nama: string;
  kategori: string;
  merek: string;
  deskripsi: string;
  kegunaan: string[];
  panduan: string;
  dosis: string;
  foto: string;
  harga: string;
  ketersediaan: string;
  subsidi: boolean;
  aktif: boolean;
}

export interface PupukItem extends PupukPayload {
  id: number;
}

const pupukService = {
  async getAll() {
    const { data } = await api.get("/pupuk");
    return data.data as PupukItem[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/pupuk/${id}`);
    return data.data as PupukItem;
  },

  async create(payload: PupukPayload) {
    const { data } = await api.post("/pupuk", payload);
    return data.data as PupukItem;
  },

  async update(id: number | string, payload: PupukPayload) {
    const { data } = await api.put(`/pupuk/${id}`, payload);
    return data.data as PupukItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/pupuk/${id}`);
    return data.data;
  },
};

export default pupukService;
