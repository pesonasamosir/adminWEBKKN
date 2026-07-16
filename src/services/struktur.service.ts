import api from "../lib/api";

export interface StrukturPayload {
  nama: string;
  jabatan: string;
  foto: string;
  periode: string;
}

export interface StrukturItem extends StrukturPayload {
  id: number;
}

const strukturService = {
  async getAll() {
    const { data } = await api.get("/struktur");
    return data.data as StrukturItem[];
  },

  async create(payload: StrukturPayload) {
    const { data } = await api.post("/struktur", payload);
    return data.data as StrukturItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/struktur/${id}`);
    return data.data;
  },
};

export default strukturService;
