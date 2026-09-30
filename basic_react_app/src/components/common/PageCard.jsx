function PageCard({ children, className = "" }) {
  return (
    <section
      className={`mx-auto w-full rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default PageCard;
