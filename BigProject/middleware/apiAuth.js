const Listing = require("../model/listing.js");
const Review = require("../model/review.js");

const notAuthenticated = (res) =>
  res.status(401).json({ error: "Authentication required" });

const notAuthorized = (res) =>
  res.status(403).json({ error: "Not authorized" });

module.exports.isLoggedInApi = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return notAuthenticated(res);
  }
  next();
};

module.exports.isOwnerApi = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  if (!listing.owner._id.equals(req.user._id)) {
    return notAuthorized(res);
  }
  next();
};

module.exports.isReviewAuthorApi = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  if (!review.author._id.equals(req.user._id)) {
    return notAuthorized(res);
  }
  next();
};
