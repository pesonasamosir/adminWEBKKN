import api from "../lib/api";

export interface WisataPayload {
  nama: string;
  slug?: string;
  kategori: string;
  deskripsi: string;
  foto: string;
  lokasi: string;
  alamat: string;
  harga_tiket: string;
  jam_buka: string;
  featured: boolean;
  village_id: number | null;
  aktif: boolean;
}

export interface WisataItem extends WisataPayload {
  id: number;
}

const wisataService = {
  async getAll() {
    const { data } = await api.get("/wisata");
    return data.data as WisataItem[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/wisata/${id}`);
    return data.data as WisataItem;
  },

  async create(payload: WisataPayload) {
    const { data } = await api.post("/wisata", payload);
    return data.data as WisataItem;
  },

  async update(id: number | string, payload: WisataPayload) {
    const { data } = await api.put(`/wisata/${id}`, payload);
    return data.data as WisataItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/wisata/${id}`);
    return data.data;
  },
};

export default wisataService;
