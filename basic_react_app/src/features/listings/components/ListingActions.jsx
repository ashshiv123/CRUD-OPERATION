import { Link } from "react-router-dom";

function ListingActions({ listingId, isOwner, onDelete }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {isOwner ? (
        <>
          <Link
            to={`/listings/${listingId}/edit`}
            className="rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Edit Listing
          </Link>
          <button
            type="button"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
            onClick={onDelete}
          >
            Delete Listing
          </button>
        </>
      ) : null}
      <Link
        to="/listings"
        className="rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700"
      >
        Back
      </Link>
    </div>
  );
}

export default ListingActions;
