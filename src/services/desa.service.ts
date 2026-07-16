import api from "../lib/api";

export interface DesaPayload {
  slug: string;
  nama: string;
  foto: string;
  banner: string;
  deskripsi: string;
  kepala_desa: string;
  sekretaris: string;
  penduduk: number;
  luas_wilayah: string;
  rt: number;
  rw: number;
  sejarah: string;
  visi: string;
  misi: string[];
  aktif: boolean;
}

export interface Desa extends DesaPayload {
  id: number;
}

const desaService = {
  async getAll() {
    const { data } = await api.get("/desa");
    return data.data as Desa[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/desa/${id}`);
    return data.data as Desa;
  },

  async create(payload: DesaPayload) {
    const { data } = await api.post("/desa", payload);
    return data.data as Desa;
  },

  async update(id: number | string, payload: DesaPayload) {
    const { data } = await api.put(`/desa/${id}`, payload);
    return data.data as Desa;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/desa/${id}`);
    return data.data;
  },
};

export default desaService;
