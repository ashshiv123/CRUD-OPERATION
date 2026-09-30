import { Link } from "react-router-dom";
import {
  formatPrice,
  getImageUrl,
  getListingType,
} from "../utils/listingUtils.js";

function ListingCard({ listing, accent }) {
  const typeLabel = getListingType(listing);
  const amenities = Array.isArray(listing.amenities) ? listing.amenities : [];
  const distanceLabel = listing.distance || "Near campus";
  const addressLabel =
    listing.address || listing.location?.address || "Address available on request";

  return (
    <Link
      to={`/listings/${listing._id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${accent.cardBorder}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={getImageUrl(listing)}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${accent.badge}`}>
            {typeLabel}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.verified}`}>
            Verified
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-slate-900 transition group-hover:text-indigo-700">
          {listing.title}
        </h3>
        <p className="mb-1 text-sm text-slate-600">{addressLabel}</p>
        <p className="mb-3 text-xs text-slate-500">{distanceLabel}</p>
        {amenities.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className={`rounded-md px-2 py-1 text-xs font-medium ${accent.amenity}`}
              >
                {amenity}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-xl font-bold text-slate-900">{formatPrice(listing.price)}</p>
          </div>
          <span className={`rounded-full px-3 py-2 text-xs font-semibold ${accent.cta}`}>
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
