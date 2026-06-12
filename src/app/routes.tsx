import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

// Public pages
import { HomePage } from "./pages/public/HomePage";
import { ProfilPage } from "./pages/public/ProfilPage";
import { DesaListPage } from "./pages/public/DesaListPage";
import { DesaDetailPage } from "./pages/public/DesaDetailPage";
import { StrukturPage } from "./pages/public/StrukturPage";
import { WisataPage } from "./pages/public/WisataPage";
import { WisataDetailPage } from "./pages/public/WisataDetailPage";
import { UMKMPage } from "./pages/public/UMKMPage";
import { UMKMDetailPage } from "./pages/public/UMKMDetailPage";
import { BudayaPage } from "./pages/public/BudayaPage";
import { BeritaPage } from "./pages/public/BeritaPage";
import { BeritaDetailPage } from "./pages/public/BeritaDetailPage";
import { KalenderPage } from "./pages/public/KalenderPage";
import { PupukPage } from "./pages/public/PupukPage";
import { PupukDetailPage } from "./pages/public/PupukDetailPage";
import { GaleriPage } from "./pages/public/GaleriPage";
import { KontakPage } from "./pages/public/KontakPage";
import { NotFoundPage } from "./pages/public/NotFoundPage";

// Admin pages
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { BeritaListPage } from "./pages/admin/BeritaListPage";
import { BeritaFormPage } from "./pages/admin/BeritaFormPage";
import { WisataListPage } from "./pages/admin/WisataListPage";
import { WisataFormPage } from "./pages/admin/WisataFormPage";
import { UMKMListPage } from "./pages/admin/UMKMListPage";
import { UMKMFormPage } from "./pages/admin/UMKMFormPage";
import { EventKalenderPage } from "./pages/admin/EventKalenderPage";
import { PupukListPage } from "./pages/admin/PupukListPage";
import { PupukFormPage } from "./pages/admin/PupukFormPage";
import {
  ProfilAdminPage,
  StrukturAdminPage,
  GaleriAdminPage,
  KategoriPage,
  KontakAdminPage,
  SettingsPage,
  UsersPage,
  ProfilSayaPage,
  DesaListAdminPage,
  DesaFormAdminPage,
} from "./pages/admin/MiscAdminPages";

export const router = createBrowserRouter([
  {
    // Pathless root route — provides AppContext to the entire router tree
    Component: RootLayout,
    children: [
      // Admin Routes
      {
        path: "/admin/login",
        Component: LoginPage,
      },
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: DashboardPage },
          { path: "desa", Component: DesaListAdminPage },
          { path: "desa/create", Component: DesaFormAdminPage },
          { path: "desa/:id/edit", Component: DesaFormAdminPage },
          { path: "berita", Component: BeritaListPage },
          { path: "berita/create", Component: BeritaFormPage },
          { path: "berita/:id/edit", Component: BeritaFormPage },
          { path: "wisata", Component: WisataListPage },
          { path: "wisata/create", Component: WisataFormPage },
          { path: "wisata/:id/edit", Component: WisataFormPage },
          { path: "umkm", Component: UMKMListPage },
          { path: "umkm/create", Component: UMKMFormPage },
          { path: "umkm/:id/edit", Component: UMKMFormPage },
          { path: "events", Component: EventKalenderPage },
          { path: "pupuk", Component: PupukListPage },
          { path: "pupuk/create", Component: PupukFormPage },
          { path: "pupuk/:id/edit", Component: PupukFormPage },
          { path: "profil", Component: ProfilAdminPage },
          { path: "struktur", Component: StrukturAdminPage },
          { path: "galeri", Component: GaleriAdminPage },
          { path: "kategori", Component: KategoriPage },
          { path: "kontak", Component: KontakAdminPage },
          { path: "settings", Component: SettingsPage },
          { path: "users", Component: UsersPage },
          { path: "profil-saya", Component: ProfilSayaPage },
        ],
      },
      // Public Routes
      {
        path: "/",
        Component: PublicLayout,
        children: [
          { index: true, Component: HomePage },
          { path: "profil-kecamatan", Component: ProfilPage },
          { path: "profil", Component: ProfilPage },
          { path: "profil/struktur", Component: StrukturPage },
          { path: "desa", Component: DesaListPage },
          { path: "desa/:slug", Component: DesaDetailPage },
          { path: "wisata", Component: WisataPage },
          { path: "wisata/:slug", Component: WisataDetailPage },
          { path: "umkm", Component: UMKMPage },
          { path: "umkm/:id", Component: UMKMDetailPage },
          { path: "budaya", Component: BudayaPage },
          { path: "berita", Component: BeritaPage },
          { path: "berita/:slug", Component: BeritaDetailPage },
          { path: "kalender", Component: KalenderPage },
          { path: "pupuk", Component: PupukPage },
          { path: "pupuk/:id", Component: PupukDetailPage },
          { path: "galeri", Component: GaleriPage },
          { path: "kontak", Component: KontakPage },
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
]);