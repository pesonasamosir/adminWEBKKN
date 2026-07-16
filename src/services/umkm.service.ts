import api from "../lib/api";

export interface UmkmPayload {
  nama: string;
  kategori: string;
  deskripsi: string;
  foto: string;
  alamat: string;
  kontak: string;
  village_id: number | null;
  aktif: boolean;
}

export interface UmkmItem extends UmkmPayload {
  id: number;
}

const umkmService = {
  async getAll() {
    const { data } = await api.get("/umkm");
    return data.data as UmkmItem[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/umkm/${id}`);
    return data.data as UmkmItem;
  },

  async create(payload: UmkmPayload) {
    const { data } = await api.post("/umkm", payload);
    return data.data as UmkmItem;
  },

  async update(id: number | string, payload: UmkmPayload) {
    const { data } = await api.put(`/umkm/${id}`, payload);
    return data.data as UmkmItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/umkm/${id}`);
    return data.data;
  },
};

export default umkmService;
