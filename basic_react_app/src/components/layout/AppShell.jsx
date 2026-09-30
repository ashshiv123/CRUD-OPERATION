import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Flash from "../ui/Flash.jsx";
import AppRoutes from "../../app/AppRoutes.jsx";

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(40rem_40rem_at_8%_12%,rgba(48,86,211,0.16),transparent_65%),radial-gradient(36rem_36rem_at_90%_20%,rgba(138,56,245,0.18),transparent_60%),linear-gradient(180deg,#f8f9ff_0%,#f3f5ff_100%)] text-slate-900">
      <Navbar />
      <main className="mx-auto my-5 w-[min(1150px,92vw)] flex-1">
        <Flash />
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
