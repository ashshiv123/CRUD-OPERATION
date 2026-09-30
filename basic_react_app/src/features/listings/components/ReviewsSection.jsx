function ReviewsSection({ reviews, user, onDelete }) {
  return (
    <div className="mt-4 rounded-2xl border border-indigo-100 bg-slate-50 p-4">
      <h3 className="mb-3 font-['Space_Grotesk'] text-2xl font-bold text-slate-900">Reviews</h3>
      {reviews.length === 0 ? <p className="text-sm text-slate-500">No reviews yet.</p> : null}
      <div className="grid gap-3">
        {reviews.map((rev) => (
          <article key={rev._id} className="rounded-xl border border-indigo-100 bg-white p-3">
            <p className="mb-2 text-xs font-medium text-slate-500">
              ⭐ {rev.rating}/5 by {rev.author?.username || "Anonymous"} on{" "}
              {new Date(rev.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-slate-700">{rev.comment}</p>
            {user && user._id === rev.author?._id ? (
              <button
                type="button"
                className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                onClick={() => onDelete(rev._id)}
              >
                Delete Review
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
