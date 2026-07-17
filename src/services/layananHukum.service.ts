import api from "../lib/api";

export interface LayananHukumPayload {
  nama_firma: string;
  foto?: string;
  deskripsi: string;
  alamat: string;
  link_gmaps?: string;
  no_hp: string;
  email: string;
  jam_operasional: string[];
  bidang_layanan: string[];
  nama_advokat?: string;
  persyaratan_konsultasi: string[];
  aktif?: boolean;
}

export interface LayananHukum extends LayananHukumPayload {
  id: number;
}

const layananHukumService = {
  async getAll() {
    const { data } = await api.get("/layananHukum");
    return data.data as LayananHukum[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/layananHukum/${id}`);
    return data.data as LayananHukum;
  },

  async create(payload: LayananHukumPayload) {
    const { data } = await api.post("/layananHukum", payload);
    return data.data as LayananHukum;
  },

  async update(id: number | string, payload: LayananHukumPayload) {
    const { data } = await api.put(`/layananHukum/${id}`, payload);
    return data.data as LayananHukum;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/layananHukum/${id}`);
    return data.data;
  },
};

export default layananHukumService;