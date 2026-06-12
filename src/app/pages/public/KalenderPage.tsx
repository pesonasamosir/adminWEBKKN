import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { type Event } from "../../data/mockData";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export function KalenderPage() {
  const { events } = useApp();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getEventsForDay = (day: number) => {
    return events.filter(e => {
      const start = new Date(e.tanggal_mulai);
      const end = new Date(e.tanggal_selesai);
      const d = new Date(currentYear, currentMonth, day);
      return d >= start && d <= end && e.aktif;
    });
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const upcomingEvents = events.filter(e => new Date(e.tanggal_mulai) >= today && e.aktif)
    .sort((a, b) => new Date(a.tanggal_mulai).getTime() - new Date(b.tanggal_mulai).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-48" style={{ background: "linear-gradient(135deg, #1A56A0 0%, #0d3d7a 100%)" }}>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white mb-2">Kalender Event</h1>
            <p className="text-blue-200 text-sm">Jadwal kegiatan dan event Kecamatan Harian</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
          {/* Calendar */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-gray-800" style={{ fontSize: "1.2rem" }}>
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Days header */}
              <div className="grid grid-cols-7 bg-gray-50">
                {DAYS.map(d => (
                  <div key={d} className="text-center py-3 text-xs font-semibold text-gray-500">{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 border-t border-gray-100">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-24 lg:h-28 border-r border-b border-gray-50 bg-gray-50/30" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  return (
                    <div key={day} className={`h-24 lg:h-28 border-r border-b border-gray-50 p-1.5 ${isToday ? "bg-blue-50" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 ${isToday ? "text-white font-bold" : "text-gray-700"}`}
                        style={isToday ? { backgroundColor: "#1A56A0" } : {}}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(e => (
                          <button key={e.id} onClick={() => setSelectedEvent(e)}
                            className="w-full text-left text-white rounded px-1.5 py-0.5 truncate hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: e.warna, fontSize: "10px", lineHeight: "1.3" }}>
                            {e.judul}
                          </button>
                        ))}
                        {dayEvents.length > 2 && <div className="text-xs text-gray-400 px-1">+{dayEvents.length - 2} lagi</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div>
            <h2 className="text-gray-800 mb-4" style={{ fontSize: "1.1rem" }}>Event Mendatang</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {upcomingEvents.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center text-gray-400 text-sm shadow-sm">Belum ada event mendatang</div>
              ) : upcomingEvents.map((e) => (
                <div key={e.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEvent(e)}>
                  <div className="flex items-start gap-3">
                    <div className="text-center rounded-lg p-2 text-white shrink-0 w-14" style={{ backgroundColor: e.warna }}>
                      <div className="font-bold text-lg leading-none">{new Date(e.tanggal_mulai).getDate()}</div>
                      <div className="text-xs opacity-90 mt-1">{MONTHS[new Date(e.tanggal_mulai).getMonth()].slice(0, 3)}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm line-clamp-2">{e.judul}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={10} />
                        <span className="line-clamp-1">{e.lokasi}</span>
                      </div>
                      <span className="inline-block text-white text-xs mt-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: e.warna }}>{e.kategori}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <span className="text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: selectedEvent.warna }}>{selectedEvent.kategori}</span>
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <h3 className="font-bold text-gray-800 mb-3">{selectedEvent.judul}</h3>
            <p className="text-gray-600 text-sm mb-4">{selectedEvent.deskripsi}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div><span className="font-medium">Tanggal:</span> {new Date(selectedEvent.tanggal_mulai).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                {selectedEvent.tanggal_mulai !== selectedEvent.tanggal_selesai && ` - ${new Date(selectedEvent.tanggal_selesai).toLocaleDateString("id-ID", { day: "numeric", month: "long" })}`}
              </div>
              <div><span className="font-medium">Lokasi:</span> {selectedEvent.lokasi}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
