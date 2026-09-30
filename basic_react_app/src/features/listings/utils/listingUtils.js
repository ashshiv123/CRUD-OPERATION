const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80";

export function getListingImages(listing) {
  if (!listing) return [];

  if (Array.isArray(listing.images)) {
    return listing.images.filter((image) => image?.url);
  }

  if (Array.isArray(listing.image)) {
    return listing.image.filter((image) => image?.url);
  }

  if (listing.image?.url) {
    return [listing.image];
  }

  return [];
}

export function getImageUrl(listing) {
  return getListingImages(listing)[0]?.url || FALLBACK_IMAGE;
}

export function getImageUrls(listing) {
  const urls = getListingImages(listing).map((image) => image.url).filter(Boolean);
  return urls.length > 0 ? urls : [FALLBACK_IMAGE];
}

export function getTypeByPrice(price) {
  return Number(price) >= 8000 ? "premium" : "budget";
}

export function getListingType(listing) {
  return listing.type || listing.roomType || listing.category || "Hostel";
}

export function formatPrice(value) {
  return `₹ ${Number(value || 0).toLocaleString("en-IN")}`;
}

export function buildListingFormData(form) {
  const formData = new FormData();
  formData.append("listing[title]", form.title.trim());
  formData.append("listing[description]", form.description.trim());
  formData.append("listing[gender]", form.gender);
  formData.append("listing[price]", form.price);
  formData.append("listing[address]", form.address.trim());
  formData.append("listing[location][type]", "Point");
  formData.append("listing[location][coordinates][0]", form.longitude);
  formData.append("listing[location][coordinates][1]", form.latitude);

  form.amenities
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => {
      formData.append("listing[amenities][]", item);
    });

  (form.images || []).forEach((file) => {
    formData.append("listing[images]", file);
  });

  return formData;
}

export function getInitialListingForm() {
  return {
    title: "",
    description: "",
    gender: "boys",
    price: "",
    address: "",
    latitude: "",
    longitude: "",
    amenities: "",
    images: [],
    existingImages: [],
  };
}

export function mapListingToForm(listing) {
  const coordinates = listing.location?.coordinates || [];

  return {
    title: listing.title || "",
    description: listing.description || "",
    gender: listing.gender || "boys",
    price: String(listing.price || ""),
    address: listing.address || "",
    latitude: coordinates[1] ?? "",
    longitude: coordinates[0] ?? "",
    amenities: (listing.amenities || []).join(", "),
    images: [],
    existingImages: getListingImages(listing),
  };
}
