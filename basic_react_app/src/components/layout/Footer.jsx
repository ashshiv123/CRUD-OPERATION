function Footer() {
  return (
    <footer className="border-t border-indigo-100 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto flex w-[min(1150px,92vw)] flex-wrap items-center justify-between gap-2 py-4 text-sm text-slate-600">
        <span>© {new Date().getFullYear()} HostelHub</span>
        <span>Verified hostels and PG listings near campus</span>
        <span>Privacy • Terms • Help</span>
      </div>
    </footer>
  );
}

export default Footer;
