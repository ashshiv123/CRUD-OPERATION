import FormField from "../../../components/forms/FormField.jsx";
import TextAreaInput from "../../../components/forms/TextAreaInput.jsx";

function ReviewForm({ review, onChange, onSubmit }) {
  return (
    <form className="mt-5 grid gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4" onSubmit={onSubmit}>
      <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Leave a Review</h3>
      <div className="grid gap-1.5">
        <label htmlFor="rating" className="text-sm font-semibold text-slate-700">
          Rating: {review.rating}
        </label>
        <input
          id="rating"
          type="range"
          min="1"
          max="5"
          value={review.rating}
          onChange={(event) => onChange("rating", Number(event.target.value))}
        />
      </div>
      <FormField label="Comment" htmlFor="comment">
        <TextAreaInput
          id="comment"
          required
          value={review.comment}
          onChange={(event) => onChange("comment", event.target.value)}
        />
      </FormField>
      <button
        type="submit"
        className="w-fit rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
