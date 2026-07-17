import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { AdminLayout } from "./components/layout/AdminLayout";



// Admin pages
import { DashboardPage } from "./pages/admin/DashboardPage";
import { LayananHukumListPage } from "./pages/admin/layananHukumListPage";
import { LayananHukumFormPage } from "./pages/admin/layananHukumFormPage";
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
        path: "/",
        Component: AdminLayout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "dashboard", Component: DashboardPage },
          { path: "desa", Component: DesaListAdminPage },
          { path: "desa/create", Component: DesaFormAdminPage },
          { path: "desa/:id/edit", Component: DesaFormAdminPage },
          { path: "berita", Component: LayananHukumListPage },
          { path: "berita/create", Component: LayananHukumFormPage },
          { path: "berita/:id/edit", Component: LayananHukumFormPage },
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
        ],
      },
    ],
  },
]);