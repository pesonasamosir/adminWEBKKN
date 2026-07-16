import api from "../lib/api";

export interface KontakItem {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
  tanggal: string;
  dibaca: boolean;
}

const kontakService = {
  async getAll() {
    const { data } = await api.get("/kontak");
    return data.data as KontakItem[];
  },

  async markAsRead(id: number | string) {
    const { data } = await api.patch(`/kontak/${id}/read`);
    return data.data as KontakItem;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/kontak/${id}`);
    return data.data;
  },
};

export default kontakService;
