import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/client.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import ListingForm from "../../features/listings/components/ListingForm.jsx";
import {
  buildListingFormData,
  getInitialListingForm,
} from "../../features/listings/utils/listingUtils.js";

function ListingNew() {
  const [form, setForm] = useState(getInitialListingForm);
  const { user, loading } = useAuth();
  const { setFlash } = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      setFlash({ type: "error", message: "Please log in to create a listing." });
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

    if ((form.images || []).length === 0) {
      setFlash({ type: "error", message: "Please select at least one property image." });
      return;
    }

    try {
      const data = await apiRequest("/api/listings", {
        method: "POST",
        body: buildListingFormData(form),
      });

      setFlash({ type: "success", message: "New listing created." });
      navigate(`/listings/${data.listing._id}`);
    } catch (err) {
      setFlash({ type: "error", message: err.message });
    }
  };

  return (
    <ListingForm
      title="Create New Listing"
      submitLabel="Create Listing"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      imageLabel="Property Images"
      imageHint="Select multiple images. The backend will be updated next to store them all."
    />
  );
}

export default ListingNew;
