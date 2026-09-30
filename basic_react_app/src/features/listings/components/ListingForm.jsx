import { useEffect, useMemo } from "react";
import PageCard from "../../../components/common/PageCard.jsx";
import FormField from "../../../components/forms/FormField.jsx";
import TextInput from "../../../components/forms/TextInput.jsx";
import TextAreaInput from "../../../components/forms/TextAreaInput.jsx";
import { inputClass } from "../../../components/forms/formStyles.js";

function ListingForm({ title, submitLabel, form, onChange, onSubmit, imageHint, imageLabel }) {
  const existingImages = useMemo(
    () => (Array.isArray(form.existingImages) ? form.existingImages.filter((image) => image?.url) : []),
    [form.existingImages]
  );

  const selectedPreviewUrls = useMemo(
    () => (form.images || []).map((file) => URL.createObjectURL(file)),
    [form.images]
  );

  useEffect(() => () => {
    selectedPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedPreviewUrls]);

  return (
    <PageCard className="max-w-3xl">
      <h1 className="mb-4 font-['Space_Grotesk'] text-3xl font-bold text-slate-900">{title}</h1>
      <form className="grid gap-4" onSubmit={onSubmit} encType="multipart/form-data">
        <FormField label="Title" htmlFor="title">
          <TextInput id="title" name="title" required value={form.title} onChange={onChange} />
        </FormField>

        <FormField label="Description" htmlFor="description">
          <TextAreaInput
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="For" htmlFor="gender">
            <select id="gender" name="gender" value={form.gender} onChange={onChange} className={inputClass}>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
            </select>
          </FormField>

          <FormField label="Monthly Price" htmlFor="price">
            <TextInput
              id="price"
              name="price"
              type="number"
              min="0"
              required
              value={form.price}
              onChange={onChange}
            />
          </FormField>
        </div>

        <FormField label="Address" htmlFor="address">
          <TextInput id="address" name="address" required value={form.address} onChange={onChange} />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Latitude" htmlFor="latitude">
            <TextInput
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              required
              value={form.latitude}
              onChange={onChange}
            />
          </FormField>

          <FormField label="Longitude" htmlFor="longitude">
            <TextInput
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              required
              value={form.longitude}
              onChange={onChange}
            />
          </FormField>
        </div>

        <FormField
          label="Amenities"
          htmlFor="amenities"
          hint="Separate multiple amenities with commas."
        >
          <TextInput
            id="amenities"
            name="amenities"
            placeholder="WiFi, AC, Laundry"
            value={form.amenities}
            onChange={onChange}
          />
        </FormField>

        <FormField label={imageLabel} htmlFor="images" hint={imageHint}>
          <TextInput
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={onChange}
            className={inputClass}
          />
        </FormField>

        {existingImages.length > 0 ? (
          <div className="grid gap-2">
            <p className="text-sm font-semibold text-slate-700">Current Images</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {existingImages.map((image, index) => (
                <img
                  key={image.filename || image.url || index}
                  src={image.url}
                  alt={`Current property image ${index + 1}`}
                  className="h-36 w-full rounded-xl border border-indigo-100 object-cover"
                />
              ))}
            </div>
          </div>
        ) : null}

        {selectedPreviewUrls.length > 0 ? (
          <div className="grid gap-2">
            <p className="text-sm font-semibold text-slate-700">
              Selected Images ({selectedPreviewUrls.length})
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedPreviewUrls.map((url, index) => (
                <img
                  key={`${url}-${index}`}
                  src={url}
                  alt={`Selected property image ${index + 1}`}
                  className="h-36 w-full rounded-xl border border-indigo-100 object-cover"
                />
              ))}
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          className="w-fit rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          {submitLabel}
        </button>
      </form>
    </PageCard>
  );
}

export default ListingForm;
