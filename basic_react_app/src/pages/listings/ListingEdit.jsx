import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../api/client.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import ListingForm from "../../features/listings/components/ListingForm.jsx";
import {
  buildListingFormData,
  getInitialListingForm,
  mapListingToForm,
} from "../../features/listings/utils/listingUtils.js";

function ListingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { setFlash } = useFlash();
  const [form, setForm] = useState(getInitialListingForm);
  const [loadingListing, setLoadingListing] = useState(true);

  useEffect(() => {
    let alive = true;
    apiRequest(`/api/listings/${id}`)
      .then((data) => {
        if (!alive) return;
        setForm(mapListingToForm(data.listing));
      })
      .catch((err) => {
        if (!alive) return;
        setFlash({ type: "error", message: err.message });
        navigate(`/listings/${id}`);
      })
      .finally(() => {
        if (alive) setLoadingListing(false);
      });

    return () => {
      alive = false;
    };
  }, [id, navigate, setFlash]);

  useEffect(() => {
    if (!loading && !user) {
      setFlash({ type: "error", message: "Please log in to edit a listing." });
      navigate("/login");
    }
  }, [user, loading, navigate, setFlash]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "images") {
      setForm((prev) => ({ ...prev, images: Array.from(files || []) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await apiRequest(`/api/listings/${id}`, {
        method: "PUT",
        body: buildListingFormData(form),
      });

      setFlash({ type: "success", message: "Listing updated." });
      navigate(`/listings/${data.listing._id}`);
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  if (loadingListing) {
    return <p className="text-sm text-slate-500">Loading listing...</p>;
  }

  return (
    <ListingForm
      title="Edit Listing"
      submitLabel="Update Listing"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      imageLabel="Add New Property Images"
      imageHint="You can select multiple new images. Existing images are shown below."
    />
  );
}

export default ListingEdit;
