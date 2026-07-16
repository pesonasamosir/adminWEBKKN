import api from "../lib/api";

export interface GaleriPayload {
  foto: string;
  judul: string;
  kategori: string;
  village_id: number | null;
}

export interface GaleriItem extends GaleriPayload {
  id: number;
}

const galeriService = {
  async getAll() {
    const { data } = await api.get("/galeri");
    return data.data as GaleriItem[];
  },

  async create(payload: GaleriPayload) {
    const { data } = await api.post("/galeri", payload);
    return data.data as GaleriItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/galeri/${id}`);
    return data.data;
  },
};

export default galeriService;
