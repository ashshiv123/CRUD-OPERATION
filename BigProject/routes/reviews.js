const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../model/review");
const Listing = require("../model/listing");
const { isLoggedInApi, isReviewAuthorApi } = require("../middleware/apiAuth.js");
const { validateReview } = require("../middleware/validation.js");

router.post(
  "/",
  isLoggedInApi,
  validateReview,
  wrapAsync(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    const populated = await newReview.populate("author");
    res.status(201).json({ review: populated });
  })
);

router.delete(
  "/:reviewId",
  isLoggedInApi,
  isReviewAuthorApi,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(204).send();
  })
);

module.exports = router;
