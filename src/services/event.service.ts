import api from "../lib/api";

export interface EventPayload {
  judul: string;
  kategori: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  lokasi: string;
  warna: string;
  village_id: number | null;
  aktif: boolean;
}

export interface Event extends EventPayload {
  id: number;
}

const normalizePayload = (payload: EventPayload) => ({
  ...payload,
  deskripsi: payload.deskripsi ?? "",
  lokasi: payload.lokasi ?? "",
  warna: payload.warna ?? "#1A56A0",
  village_id: payload.village_id ?? null,
  aktif: payload.aktif ?? true,
});

const eventService = {
  async getAll() {
    const { data } = await api.get("/event");
    return (data?.data ?? data) as Event[];
  },

  async getById(id: number | string) {
    const { data } = await api.get(`/event/${id}`);
    return (data?.data ?? data) as Event;
  },

  async create(payload: EventPayload) {
    const { data } = await api.post("/event", normalizePayload(payload));
    return (data?.data ?? data) as Event;
  },

  async update(id: number | string, payload: EventPayload) {
    const { data } = await api.put(`/event/${id}`, normalizePayload(payload));
    return (data?.data ?? data) as Event;
  },

  async remove(id: number | string) {
    const { data } = await api.delete(`/event/${id}`);
    return data?.data ?? data;
  },
};

export default eventService;
