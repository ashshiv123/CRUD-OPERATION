function KVRow({ title, value }) {
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3">
      <strong className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</strong>
      <span className="mt-0.5 block text-sm text-slate-800">{value}</span>
    </div>
  );
}

function DetailKeyValueGrid({ listing }) {
  return (
    <div className="grid gap-2">
      <KVRow title="Owner" value={listing.owner?.username || "Unknown"} />
      <KVRow title="Description" value={listing.description || "No description"} />
      <KVRow title="Monthly Price" value={`₹ ${Number(listing.price || 0).toLocaleString("en-IN")}`} />
      <KVRow title="Gender" value={listing.gender} />
      <KVRow title="Address" value={listing.address} />
      <KVRow
        title="Coordinates"
        value={
          listing.location?.coordinates?.length === 2
            ? `${listing.location.coordinates[1]}, ${listing.location.coordinates[0]}`
            : "Not available"
        }
      />
      <KVRow title="Amenities" value={(listing.amenities || []).join(", ") || "None"} />
    </div>
  );
}

export default DetailKeyValueGrid;
