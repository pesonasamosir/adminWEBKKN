import api from "../lib/api";

export interface BeritaPayload {
  slug?: string;
  judul: string;
  kategori: string;
  ringkasan: string;
  isi: string;
  foto: string;
  penulis: string;
  tanggal: string;
  status: "draft" | "published";
  featured: boolean;
  village_id: number | null;
}

export interface Berita extends BeritaPayload {
  id: number;
  slug: string;
}

const beritaService = {
  async getAll() {
    const { data } = await api.get("/berita");
    return data.data as Berita[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/berita/${id}`);
    return data.data as Berita;
  },

  async create(payload: BeritaPayload) {
    const { data } = await api.post("/berita", payload);
    return data.data as Berita;
  },

  async update(id: number | string, payload: BeritaPayload) {
    const { data } = await api.put(`/berita/${id}`, payload);
    return data.data as Berita;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/berita/${id}`);
    return data.data;
  },
};

export default beritaService;