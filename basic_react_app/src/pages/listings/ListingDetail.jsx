import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../api/client.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import PageCard from "../../components/common/PageCard.jsx";
import DetailKeyValueGrid from "../../features/listings/components/DetailKeyValueGrid.jsx";
import ListingActions from "../../features/listings/components/ListingActions.jsx";
import ReviewsSection from "../../features/listings/components/ReviewsSection.jsx";
import ReviewForm from "../../features/listings/components/ReviewForm.jsx";
import { getImageUrls } from "../../features/listings/utils/listingUtils.js";

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setFlash } = useFlash();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 3, comment: "" });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let alive = true;
    apiRequest(`/api/listings/${id}`)
      .then((data) => {
        if (!alive) return;
        setListing(data.listing);
      })
      .catch((err) => {
        if (!alive) return;
        setFlash({ type: "error", message: err.message });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id, setFlash]);

  const isOwner = useMemo(() => {
    if (!user || !listing?.owner) return false;
    return user._id === listing.owner._id;
  }, [user, listing]);

  const imageUrls = useMemo(() => getImageUrls(listing), [listing]);
  const activeImage = imageUrls.includes(selectedImage) ? selectedImage : imageUrls[0];

  const handleDelete = async () => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await apiRequest(`/api/listings/${id}`, { method: "DELETE" });
      setFlash({ type: "success", message: "Listing deleted." });
      navigate("/listings");
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest(`/api/listings/${id}/reviews`, {
        method: "POST",
        body: { review },
      });
      setListing((prev) => ({
        ...prev,
        reviews: [data.review, ...(prev?.reviews || [])],
      }));
      setReview({ rating: 3, comment: "" });
      setFlash({ type: "success", message: "Review submitted." });
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await apiRequest(`/api/listings/${id}/reviews/${reviewId}`, {
        method: "DELETE",
      });
      setListing((prev) => ({
        ...prev,
        reviews: (prev?.reviews || []).filter((r) => r._id !== reviewId),
      }));
      setFlash({ type: "success", message: "Review deleted." });
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  if (loading) return <p className="text-sm text-slate-500">Loading listing...</p>;
  if (!listing) return <p className="text-sm text-slate-500">Listing not found.</p>;

  return (
    <PageCard className="p-5">
      <h1 className="mb-4 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">{listing.title}</h1>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <img
            src={activeImage || imageUrls[0]}
            alt={listing.title}
            className="max-h-[340px] w-full rounded-2xl border border-indigo-100 object-cover"
          />
          {imageUrls.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={`${imageUrl}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(imageUrl)}
                  className={`overflow-hidden rounded-xl border ${
                    imageUrl === activeImage
                      ? "border-indigo-500 ring-2 ring-indigo-200"
                      : "border-indigo-100"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`${listing.title} ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
          <ReviewsSection reviews={listing.reviews || []} user={user} onDelete={handleReviewDelete} />
        </div>

        <div>
          <DetailKeyValueGrid listing={listing} />
          <ListingActions listingId={listing._id} isOwner={isOwner} onDelete={handleDelete} />
          {user ? (
            <ReviewForm
              review={review}
              onChange={(key, value) => setReview((prev) => ({ ...prev, [key]: value }))}
              onSubmit={handleReviewSubmit}
            />
          ) : null}
        </div>
      </div>
    </PageCard>
  );
}

export default ListingDetail;
