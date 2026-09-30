import { useMemo, useState } from "react";
import ListingCard from "./ListingCard.jsx";
import { getTypeByPrice } from "../utils/listingUtils.js";

const FILTERS = ["all", "budget", "premium"];

function ListingsSection({ id, title, pillLabel, forGirls, listings }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return listings;
    return listings.filter((item) => getTypeByPrice(item.price) === filter);
  }, [filter, listings]);

  const accent = forGirls
    ? {
        cardBorder: "border-pink-100 hover:border-pink-300",
        badge: "bg-pink-600",
        verified: "bg-pink-50 text-pink-700 border border-pink-200",
        amenity: "bg-pink-50 text-pink-700",
        pill: "bg-pink-100 text-pink-700",
        cta: "bg-pink-100 text-pink-700",
        buttonActive: "bg-pink-600 text-white shadow-lg",
      }
    : {
        cardBorder: "border-blue-100 hover:border-blue-300",
        badge: "bg-blue-600",
        verified: "bg-blue-50 text-blue-700 border border-blue-200",
        amenity: "bg-blue-50 text-blue-700",
        pill: "bg-blue-100 text-blue-700",
        cta: "bg-blue-100 text-blue-700",
        buttonActive: "bg-blue-600 text-white shadow-lg",
      };

  return (
    <section id={id} className="py-16">
      <div className="mx-auto w-[min(1150px,92vw)]">
        <div className="mb-10 text-center">
          <span className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold ${accent.pill}`}>
            {pillLabel}
          </span>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Safe, verified stays curated for engineering students near campus.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-slate-600">Filter by:</span>
          {FILTERS.map((label) => (
            <button
              key={label}
              type="button"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                filter === label
                  ? accent.buttonActive
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setFilter(label)}
            >
              {label[0].toUpperCase() + label.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-500">No listings in this filter yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing._id} listing={listing} accent={accent} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <span className={`inline-flex rounded-full px-6 py-3 text-xs font-semibold ${accent.cta}`}>
            Load more listings
          </span>
        </div>
      </div>
    </section>
  );
}

export default ListingsSection;
