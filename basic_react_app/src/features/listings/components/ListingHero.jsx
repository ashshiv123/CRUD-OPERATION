import { HERO_STATS } from "../data/homepageData.js";

function ListingHero() {
  return (
    <section className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-12 text-slate-900 shadow-2xl shadow-indigo-200/50 sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-6 top-6 h-48 w-48 rounded-full bg-indigo-400 blur-3xl"></div>
        <div className="absolute right-10 top-20 h-48 w-48 rounded-full bg-purple-400 blur-3xl"></div>
        <div className="absolute bottom-[-5rem] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-400 blur-3xl"></div>
      </div>

      <div className="relative">
        <h1 className="mb-4 font-['Space_Grotesk'] text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          Your Campus Living
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Made Simple & Delicious
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-slate-600 md:text-lg">
          Find verified accommodations AND daily meals exclusively for Engineering College students. Everything you need
          in one place.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-4">
          <a
            href="#boys"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-xs font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Boys Accommodations
          </a>
          <a
            href="#girls"
            className="rounded-2xl bg-gradient-to-r from-pink-600 to-purple-700 px-6 py-3 text-xs font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Girls Accommodations
          </a>
          <a
            href="#food"
            className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-xs font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Food Services
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/50 bg-white/80 p-4 text-center shadow-sm"
            >
              <strong className="block text-2xl font-bold text-slate-900">{stat.value}</strong>
              <span className="text-xs text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListingHero;
